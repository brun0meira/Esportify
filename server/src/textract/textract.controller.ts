import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { TextractService } from './textract.service';
import { ApiConsumes, ApiBody, ApiResponse, ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { GetCurrentUserId } from '../common/decorators/get-current-user-id.decorator';
import { RgDataDto } from './dto/rg-data.dto';

@ApiTags('Textract - Análise de RG')
@Controller('textract')
export class TextractController {
  constructor(private readonly textractService: TextractService) {}

  @Post('analyze-rg')
  @ApiBearerAuth()
  @UseInterceptors(FilesInterceptor('images', 2))
  @ApiOperation({ summary: 'Analisar frente e verso do RG' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Envie a frente e verso do RG (2 imagens)',
    schema: {
      type: 'object',
      properties: {
        images: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
          minItems: 2,
          maxItems: 2,
        },
      },
    },
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Dados do RG extraídos com sucesso',
    type: RgDataDto,
  })
  async analyzeRg(@GetCurrentUserId() userId: string,
    @UploadedFiles() files: Array<Express.Multer.File>) {
    if (!files || files.length !== 2) {
      throw new Error('Você deve enviar exatamente duas imagens (frente e verso do RG)');
    }

    const [frontText, backText] = await Promise.all([
      this.textractService.analyzeDocument(files[0].buffer),
      this.textractService.analyzeDocument(files[1].buffer),
    ]);

    const extractData = await this.textractService.extractRgData(frontText, backText);

    await this.textractService.validateUserData(userId, extractData)

    await this.textractService.saveDocument(userId, extractData.rg);

    return extractData;

  }
}