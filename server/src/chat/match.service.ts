import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMatchDto, UpdateMatchDto } from './dto/match.dto';

@Injectable()
export class MatchService {
  constructor(private readonly prisma: PrismaService) {}

  async createMatch(createMatchDto: CreateMatchDto) {
    const { opponent, date, isHomeGame, tournament } = createMatchDto;
    
    return this.prisma.match.create({
      data: {
        opponent,
        date,
        isHomeGame,
        tournament,
        status: 'UPCOMING'
      }
    });
  }

  async getAllMatches() {
    return this.prisma.match.findMany({
      orderBy: {
        date: 'asc'
      },
      include: {
        liveChat: true
      }
    });
  }

  async getUpcomingMatches() {
    return this.prisma.match.findMany({
      where: {
        status: 'UPCOMING'
      },
      orderBy: {
        date: 'asc'
      }
    });
  }

  async getLiveMatches() {
    return this.prisma.match.findMany({
      where: {
        status: 'LIVE'
      },
      include: {
        liveChat: true
      }
    });
  }

  async getMatchById(matchId: string) {
    return this.prisma.match.findUnique({
      where: { id: matchId },
      include: {
        liveChat: {
          include: {
            messages: {
              include: {
                user: true
              },
              orderBy: {
                createdAt: 'desc'
              },
              take: 50
            }
          }
        }
      }
    });
  }

  async startMatch(matchId: string) {
    const match = await this.prisma.match.findUnique({ where: { id: matchId } });
    
    const chatRoom = await this.prisma.chatRoom.create({
      data: {
        name: `FURIA vs ${match.opponent} - AO VIVO`,
        description: `Chat oficial da partida contra ${match.opponent}`,
        isPublic: true,
        isMatchChat: true,
        match: { connect: { id: matchId } },
        createdBy: { connect: { id: 'SYSTEM' } }
      }
    });
  
    return this.prisma.match.update({
      where: { id: matchId },
      data: {
        status: 'LIVE',
        liveChat: { connect: { id: chatRoom.id } }
      },
      include: {
        liveChat: true
      }
    });
  }

  async updateMatchScore(matchId: string, scoreFURIA: number, scoreOpponent: number) {
    return this.prisma.match.update({
      where: { id: matchId },
      data: {
        scoreFURIA,
        scoreOpponent
      }
    });
  }

  async finishMatch(matchId: string, scoreFURIA: number, scoreOpponent: number) {
    return this.prisma.match.update({
      where: { id: matchId },
      data: {
        status: 'FINISHED',
        scoreFURIA,
        scoreOpponent
      }
    });
  }

  async updateMatch(matchId: string, updateMatchDto: UpdateMatchDto) {
    return this.prisma.match.update({
      where: { id: matchId },
      data: updateMatchDto
    });
  }

  async deleteMatch(matchId: string) {
    return this.prisma.match.delete({
      where: { id: matchId }
    });
  }
}