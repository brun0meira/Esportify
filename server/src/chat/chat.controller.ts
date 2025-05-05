import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatRoomDto, UpdateChatRoomDto, SendMessageDto, JoinRoomDto } from './dto/chat.dto';
import { RtGuard } from '../common/guards';
import { GetCurrentUserId } from '../common/decorators/get-current-user-id.decorator';
import { User } from '@prisma/client';

//@UseGuards(JwtGuard)
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('rooms')
  createRoom(@Body() createChatRoomDto: CreateChatRoomDto) {
    return this.chatService.createRoom(createChatRoomDto);
  }

  @Get('rooms/public')
  getPublicRooms() {
    return this.chatService.getPublicRooms();
  }

  @Get('rooms/me')
  getUserRooms(@GetCurrentUserId() userID: string) {
    return this.chatService.getUserRooms(userID);
  }

  @Get('rooms/:id')
  getRoomById(@Param('id') roomId: string) {
    return this.chatService.getRoomById(roomId);
  }

  @Post('messages')
  sendMessage(@Body() sendMessageDto: SendMessageDto) {
    return this.chatService.sendMessage(sendMessageDto);
  }

  @Get('rooms/:id/messages')
  getRoomMessages(@Param('id') roomId: string) {
    return this.chatService.getRoomMessages(roomId);
  }

  @Post('rooms/join')
  joinRoom(@Body() joinRoomDto: JoinRoomDto) {
    return this.chatService.joinRoom(joinRoomDto.roomId, joinRoomDto.userId);
  }

  @Post('rooms/leave')
  leaveRoom(@Body() joinRoomDto: JoinRoomDto) {
    return this.chatService.leaveRoom(joinRoomDto.roomId, joinRoomDto.userId);
  }

  @Put('rooms/:id')
  updateRoom(@Param('id') roomId: string, @Body() updateChatRoomDto: UpdateChatRoomDto) {
    return this.chatService.updateRoom(roomId, updateChatRoomDto);
  }

  @Delete('rooms/:id')
  deleteRoom(@Param('id') roomId: string) {
    return this.chatService.deleteRoom(roomId);
  }
}