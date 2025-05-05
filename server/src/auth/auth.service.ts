import {
    BadGatewayException,
    ForbiddenException,
    Injectable,
  } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/binary';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto, AuthLoginDto } from './dto';
import { JwtPayload, Tokens } from './types';
import { use } from 'passport';
  
@Injectable()
export class AuthService {
    constructor(
      private prisma: PrismaService,
      private jwtService: JwtService,
      private config: ConfigService,
    ) {}
  
    async signupLocal(dto: AuthDto): Promise<Tokens> {
      const hashedPassword = await argon.hash(dto.password);
  
      const findUser = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });
  
      if (findUser) {
        throw new BadGatewayException('Email already exists!');
      }
  
      const user = await this.prisma.user
        .create({
          data: {
            email: dto.email,
            hashedPassword,
            name: dto.name,
            admin: dto.admin,
            cpf: dto.cpf,
            rg: dto.rg,
            address: dto.address,
            // score: dto.score,
            // lastLogin: dto.lastLogin,
            interests: dto.interests,
            eventsAttended: dto.eventsAttended,
            purchases: dto.purchases,
          },
        })
        .catch((error) => {
          if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
              throw new ForbiddenException('Credentials incorrect');
            }
          }
          throw error;
        });
  
      const tokens = await this.getTokens(user.id, user.email, user.admin);
      await this.updateRtHash(user.id, tokens.refresh_token);
  
      return tokens;
    }
  
    async signinLocal(dto: AuthLoginDto): Promise<Tokens> {
      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
  
      if (!user)
        throw new ForbiddenException(
          'E-mail or password does not exist. Access Denied!',
        );

      //Verificar se o usuário já fez login alguma vez
      if(user.lastLogin == "") {
        await this.prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                lastLogin: new Date().toString(),
            },
        })
      //Efetua verificações de tempo de login, e se o usuário ganha ou não um streak de pontos
      } else {
          let lastLogin = new Date(user.lastLogin)

          let actualDate = new Date()

          var hours = Math.abs(lastLogin.getTime() - actualDate.getTime()) / 36e5;

          //Se o tempo de login for maior que 24h, e menor do que 48h o usuário ganha um streak
          if(hours >= 24 && hours <= 48) {
              await this.prisma.user.update({
                  where: {
                      id: user.id,
                  },
                  data: {
                      lastLogin: new Date().toString(),
                      score: user.score + 5,
                  },
              })
          }
          //Se o tempo de login for menor que 24h, o usuário não ganha nada, e o lastLogin permanece o mesmo
      }
  
      const passwordMatches = await argon.verify(
        user.hashedPassword,
        dto.password,
      );
      if (!passwordMatches)
        throw new ForbiddenException(
          'E-mail or password does not exist. Access Denied!',
        );
  
      const tokens = await this.getTokens(user.id, user.email, user.admin);
      await this.updateRtHash(user.id, tokens.refresh_token);
  
      return tokens;
    }
  
    async logout(userId: string): Promise<boolean> {
      await this.prisma.user.updateMany({
        where: {
          id: userId,
          hashedRt: {
            not: null,
          },
        },
        data: {
          hashedRt: null,
        },
      });
      return true;
    }
  
    async refreshTokens(userId: string, rt: string): Promise<Tokens> {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (!user || !user.hashedRt) throw new ForbiddenException('Access Denied');
  
      const rtMatches = await argon.verify(user.hashedRt, rt);
      if (!rtMatches) throw new ForbiddenException('Access Denied');
  
      const tokens = await this.getTokens(user.id, user.email, user.admin);
      await this.updateRtHash(user.id, tokens.refresh_token);
  
      return tokens;
    }
  
    async updateRtHash(userId: string, rt: string): Promise<void> {
      const hash = await argon.hash(rt);
      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          hashedRt: hash,
        },
      });
    }
  
    async getTokens(
      userId: string,
      email: string,
      responsible: boolean,
    ): Promise<Tokens> {
      const jwtPayload: JwtPayload = {
        sub: userId,
        email: email,
      };
  
      const [at, rt] = await Promise.all([
        this.jwtService.signAsync(jwtPayload, {
          secret: this.config.get<string>('AT_SECRET'),
          expiresIn: '15m',
        }),
        this.jwtService.signAsync(jwtPayload, {
          secret: this.config.get<string>('RT_SECRET'),
          expiresIn: '7d',
        }),
      ]);
  
      return {
        access_token: at,
        refresh_token: rt,
        userId: userId,
        admin: responsible,
      };
    }
}