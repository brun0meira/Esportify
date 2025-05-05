import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatbotService {
  constructor(private prisma: PrismaService) {}

  async startSession(userId?: string) {
    const newSession = await this.prisma.chatbotSession.create({
      data: {
        userId
      }
    });
  
    const welcomeMessage = await this.prisma.chatbotMessage.create({
      data: {
        content: "Olá, fã da FURIA! Como posso te ajudar hoje? 😊\n\n1. Próximos jogos\n2. Últimos resultados\n3. Notícias do time\n4. Loja oficial\n5. Sobre a FURIA",
        isBot: true,
        sessionId: newSession.id
      }
    });
  
    return {
      id: newSession.id,
      userId: newSession.userId,
      createdAt: newSession.createdAt,
      messages: [welcomeMessage]
    };
  }

  async sendMessage(sessionId: string, content: string, userId?: string) {
    await this.prisma.chatbotMessage.create({
      data: {
        content,
        sessionId,
        userId
      }
    });

    let botResponse = "";
    content = content.toLowerCase();

    if (content.includes('1') || content.includes('jogo') || content.includes('próximo')) {
      const nextMatches = await this.getNextMatches();
      botResponse = `Próximos jogos da FURIA CS:GO:\n${nextMatches}`;
    } 
    else if (content.includes('2') || content.includes('resultado')) {
      const lastResults = await this.getLastResults();
      botResponse = `Últimos resultados:\n${lastResults}`;
    }
    else if (content.includes('3') || content.includes('notícia')) {
      botResponse = "Últimas notícias:\n- FURIA anuncia novo patrocínio\n- Time vence campeonato internacional\n- Entrevista com o capitão";
    }
    else if (content.includes('4') || content.includes('loja')) {
      botResponse = "Confira nossa loja oficial: https://loja.furia.gg\n\nTemos camisas, acessórios e itens exclusivos!";
    }
    else if (content.includes('5') || content.includes('sobre')) {
      botResponse = "A FURIA é uma organização brasileira de esports fundada em 2017. Nosso time de CS:GO é um dos melhores do mundo! 🐆";
    }
    else {
      botResponse = "Não entendi. Por favor, escolha uma opção:\n1. Próximos jogos\n2. Últimos resultados\n3. Notícias\n4. Loja\n5. Sobre";
    }

    return this.prisma.chatbotMessage.create({
      data: {
        content: botResponse,
        isBot: true,
        sessionId
      }
    });
  }

  private async getNextMatches() {
    return `
- 15/10: FURIA vs NAVI (Major)
- 20/10: FURIA vs Vitality
- 25/10: FURIA vs G2 Esports`;
  }

  private async getLastResults() {
    return `
- FURIA 2-1 Team Liquid
- FURIA 0-2 Astralis
- FURIA 2-0 MIBR`;
  }

  async getSessionMessages(sessionId: string) {
    return this.prisma.chatbotMessage.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'asc' }
    });
  }
}