import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { PrismaService } from '../prisma/prisma.service';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { ChatGateway } from './chat.gateway';


@Module({
  providers: [ChatGateway, ChatService, PrismaService, MatchService],
  controllers: [ChatController, MatchController]
})
export class ChatModule {}