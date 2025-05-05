import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChatRoomDto, SendMessageDto, UpdateChatRoomDto } from './dto/chat.dto';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async createRoom(createChatRoomDto: CreateChatRoomDto) {
    const { name, description, isPublic, createdById } = createChatRoomDto;
    
    return this.prisma.chatRoom.create({
      data: {
        name,
        description,
        isPublic,
        createdBy: { connect: { id: createdById } },
        members: { connect: { id: createdById } }
      },
      include: {
        members: true,
        createdBy: true,
        messages: true
      }
    });
  }

  async getRoomById(roomId: string) {
    return this.prisma.chatRoom.findUnique({
      where: { id: roomId },
      include: {
        members: true,
        createdBy: true,
        match: true,
        messages: {
          include: {
            user: true
          },
          orderBy: {
            createdAt: 'asc'
          }
        }
      }
    });
  }

  async getPublicRooms() {
    return this.prisma.chatRoom.findMany({
      where: { isPublic: true },
      include: {
        members: true,
        createdBy: true,
        _count: {
          select: {
            messages: true,
            members: true
          }
        }
      }
    });
  }

  async getUserRooms(userId: string) {
    return this.prisma.chatRoom.findMany({
      where: {
        members: {
          some: { id: userId }
        }
      },
      include: {
        members: true,
        createdBy: true,
        _count: {
          select: {
            messages: true,
            members: true
          }
        }
      }
    });
  }

  async sendMessage(sendMessageDto: SendMessageDto) {
    const { content, roomId, userId } = sendMessageDto;
    
    return this.prisma.chatMessage.create({
      data: {
        content,
        room: { connect: { id: roomId } },
        user: { connect: { id: userId } }
      },
      include: {
        user: true,
        room: true
      }
    });
  }

  async getRoomMessages(roomId: string) {
    return this.prisma.chatMessage.findMany({
      where: { roomId },
      include: {
        user: true
      },
      orderBy: {
        createdAt: 'asc'
      }
    });
  }

  async joinRoom(roomId: string, userId: string) {
    return this.prisma.chatRoom.update({
      where: { id: roomId },
      data: {
        members: { connect: { id: userId } }
      },
      include: {
        members: true
      }
    });
  }

  async leaveRoom(roomId: string, userId: string) {
    return this.prisma.chatRoom.update({
      where: { id: roomId },
      data: {
        members: { disconnect: { id: userId } }
      },
      include: {
        members: true
      }
    });
  }

  async updateRoom(roomId: string, updateChatRoomDto: UpdateChatRoomDto) {
    const { name, description, isPublic } = updateChatRoomDto;
    
    return this.prisma.chatRoom.update({
      where: { id: roomId },
      data: {
        name,
        description,
        isPublic
      }
    });
  }

  async deleteRoom(roomId: string) {
    return this.prisma.chatRoom.delete({
      where: { id: roomId }
    });
  }
}