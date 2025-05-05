import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('start')
  startSession(@Body('userId') userId?: string) {
    return this.chatbotService.startSession(userId);
  }

  @Post('message')
  sendMessage(
    @Body('sessionId') sessionId: string,
    @Body('message') message: string,
    @Body('userId') userId?: string
  ) {
    return this.chatbotService.sendMessage(sessionId, message, userId);
  }

  @Get('session/:id')
  getSessionMessages(@Param('id') sessionId: string) {
    return this.chatbotService.getSessionMessages(sessionId);
  }
}