import { Module } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatbotController } from './chatbot.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [ChatbotService, PrismaService],
  controllers: [ChatbotController]
})
export class ChatbotModule {}