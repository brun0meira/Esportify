import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { AtGuard } from './common/guards';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { TextractModule } from './textract/textract.module';
import { ChatModule } from './chat/chat.module';
import { ChatbotModule } from './chatbot/chatbot.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    TextractModule,
    ChatModule,
    ChatbotModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  providers: [{ provide: APP_GUARD, useClass: AtGuard }],
})
export class AppModule {}