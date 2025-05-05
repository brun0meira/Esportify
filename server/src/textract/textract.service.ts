// src/textract/textract.service.ts
import { Injectable } from '@nestjs/common';
import { TextractClient, AnalyzeDocumentCommand, AnalyzeDocumentCommandInput } from '@aws-sdk/client-textract';
import { RgDataDto } from './dto/rg-data.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TextractService {
  private readonly textractClient: TextractClient;

  constructor(private readonly prisma: PrismaService) {
    this.textractClient = new TextractClient({
      region: process.env.AWS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async analyzeDocument(fileBuffer: Buffer): Promise<string> {
    const params: AnalyzeDocumentCommandInput = {
      Document: {
        Bytes: fileBuffer,
      },
      FeatureTypes: ['TABLES', 'FORMS'],
    };

    try {
      const command = new AnalyzeDocumentCommand(params);
      const response = await this.textractClient.send(command);

      if (!response.Blocks) {
        return '';
      }

      const lines = response.Blocks
        .filter(block => block.BlockType === 'LINE' && block.Text)
        .sort((a, b) => {
          if (a.Geometry && b.Geometry) {
            const aY = a.Geometry.BoundingBox.Top;
            const bY = b.Geometry.BoundingBox.Top;
            if (aY !== bY) return aY - bY;
            
            const aX = a.Geometry.BoundingBox.Left;
            const bX = b.Geometry.BoundingBox.Left;
            return aX - bX;
          }
          return 0;
        })
        .map(block => block.Text);

      return lines.join('\n');
    } catch (error) {
      console.error('Erro ao analisar documento:', error);
      throw new Error(`Falha ao processar imagem com Textract: ${error.message}`);
    }
  }

  async extractRgData(frontText: string, backText: string): Promise<RgDataDto> {
    const nameMatch = frontText.match(/NOME\n([^\n]+)/);
    const birthDateMatch = frontText.match(/DATA NASCIMENTO[^\n]+\n([^\n]+)/);
    const authorityMatch = frontText.match(/\d{2}\/\d{2}\/\d{4}\n([^\n]+)/);

    const cpfMatch = backText.match(/(\d{3}[.\-]?\d{3}[.\-]?\d{3}[-\/]?\d{2})/);
    const rgMatch = backText.match(/REGISTRO GERAL\s+(\d{1,2}\.?\d{3}\.?\d{3}-?\d{1})/);

    if(!this.validarCPF(cpfMatch[1].trim())){
      throw new Error('CPF inválido');
    }

    return {
      name: nameMatch ? nameMatch[1].trim() : null,
      cpf: cpfMatch ? cpfMatch[1].trim() : null,
      rg: rgMatch ? rgMatch[1].trim() : null,
      birth_date: birthDateMatch ? birthDateMatch[1].trim() : null,
      issuing_authority: authorityMatch ? authorityMatch[1].trim() : null,
    };
  }

  async validateUserData(userId: string, rgData: RgDataDto): Promise<boolean> {
    const currentuser = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        hashedPassword: true,
        admin: true,
        name: true,
        cpf: true,
        rg: true,
        address: true,
        interests: true,
        eventsAttended: true,
        purchases: true,
        createdAt: true,
        updatedAt: true,
        documents: { select: { id: true, url: true, userId: true, createdAt: true } },
        socialAccounts: { select: { id: true, platform: true, username: true, userId: true, createdAt: true } },
      },
    });

    if (!currentuser) {
      throw new Error('Usuário não encontrado');
    }

    const onlyNumbersCpf = rgData.cpf.replace(/\D/g, '');

    if (currentuser.cpf !== onlyNumbersCpf) {
      throw new Error('CPF não corresponde ao usuário');
    }

    const fullName = rgData.name.toLowerCase();
    const userParts = currentuser.name.toLowerCase().split(' ');

    const allPartsMatch = userParts.every(part => fullName.includes(part));

    if (!allPartsMatch) {
      throw new Error('Nome não corresponde ao usuário');
    }

    const onlyNumbers = rgData.rg.replace(/\D/g, '');

    if (currentuser.rg !== onlyNumbers) {
      throw new Error('RG não corresponde ao usuário');
    }

    return true;
  }

  async saveDocument(userId: string, rgNumber: string): Promise<any> {
    const document = await this.prisma.document.create({
      data: {
        userId: userId,
        url: rgNumber,
      },
    });

    console.log('Documento salvo:', document);

    return document;
  }

  async validarCPF(cpf: string): Promise<boolean> {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  
    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) return false;
  
    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf[10]);
  }
}