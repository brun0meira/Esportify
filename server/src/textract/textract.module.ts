import { Module } from '@nestjs/common';
import { TextractService } from './textract.service';
import { TextractController } from './textract.controller';

@Module({
  providers: [TextractService],
  controllers: [TextractController],
})
export class TextractModule {}