import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { RtGuard } from '../common/guards';
import { MatchService } from './match.service';

@WebSocketGateway({
    cors: {
      origin: '*',
    },
  })
  export class ChatGateway {
    @WebSocketServer()
    server: Server;
  
    constructor(
      private readonly chatService: ChatService,
      private readonly matchService: MatchService
    ) {}
  
    @SubscribeMessage('joinRoom')
    async handleJoinRoom(
      @MessageBody() roomId: string,
      @ConnectedSocket() client: Socket & { user: any },
    ) {
      client.join(roomId);
      const messages = await this.chatService.getRoomMessages(roomId);
      client.emit('roomMessages', messages);
      
      const room = await this.chatService.getRoomById(roomId);
      if (room?.isMatchChat) {
        const match = await this.matchService.getMatchById((room.match).id);
        client.emit('matchInfo', match);
      }
      
      return { success: true };
    }
  
    @SubscribeMessage('sendMessage')
    async handleMessage(
      @MessageBody() data: { roomId: string; content: string },
      @ConnectedSocket() client: Socket & { user: any },
    ) {
      const message = await this.chatService.sendMessage({
        content: data.content,
        roomId: data.roomId,
        userId: client.user.sub,
      });
  
      this.server.to(data.roomId).emit('newMessage', message);
      return message;
    }
  }