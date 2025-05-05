/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ProfileUser } from './dto/pick-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async getAllUsers() {
    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        name: true,
        cpf: true,
        rg: true,
        address: true,
        score: true,
        lastLogin: true,
        interests: true,
        eventsAttended: true,
        purchases: true,
        documents: { select: { id: true, url: true } },
        socialAccounts: { select: { id: true, platform: true, username: true } },
      },
    });
    return users;
  }

  async findOne(userId: string): Promise<ProfileUser> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        hashedPassword: true,
        admin: true,
        name: true,
        cpf: true,
        rg: true,
        address: true,
        score: true,
        lastLogin: true,
        interests: true,
        eventsAttended: true,
        purchases: true,
        createdAt: true,
        updatedAt: true,
        documents: { select: { id: true, url: true, userId: true, createdAt: true } },
        socialAccounts: { select: { id: true, platform: true, username: true, userId: true, createdAt: true } },
      },
    });
    return user;
  }

  async findByEmail(email: string): Promise<ProfileUser> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        hashedPassword: true,
        admin: true,
        name: true,
        cpf: true,
        rg: true,
        address: true,
        score: true,
        lastLogin: true,
        interests: true,
        eventsAttended: true,
        purchases: true,
        createdAt: true,
        updatedAt: true,
        documents: { select: { id: true, url: true, userId: true, createdAt: true } },
        socialAccounts: { select: { id: true, platform: true, username: true, userId: true, createdAt: true } },
      },
    });
    return user;
  }

  async getUsersAttendedByEvent(event: string[]): Promise<ProfileUser[]> {
    console.log('events', event);
    const eventsUsers = this.prisma.user.findMany({
      where: { eventsAttended: { hasEvery: event } },
      select: {
        id: true,
        email: true,
        hashedPassword: true,
        admin: true,
        name: true,
        cpf: true,
        rg: true,
        address: true,
        score: true,
        lastLogin: true,
        interests: true,
        eventsAttended: true,
        purchases: true,
        createdAt: true,
        updatedAt: true,
        documents: { select: { id: true, url: true, userId: true, createdAt: true } },
        socialAccounts: { select: { id: true, platform: true, username: true, userId: true, createdAt: true } },
      },
    });
    return eventsUsers;
  }

  async getUsersInterestsByTopic(interest: string[]): Promise<ProfileUser[]> {
    const interestsUsers = this.prisma.user.findMany({
      where: { interests: { hasEvery: interest } },
      select: {
        id: true,
        email: true,
        hashedPassword: true,
        admin: true,
        name: true,
        cpf: true,
        rg: true,
        address: true,
        score: true,
        lastLogin: true,
        interests: true,
        eventsAttended: true,
        purchases: true,
        createdAt: true,
        updatedAt: true,
        documents: { select: { id: true, url: true, userId: true, createdAt: true } },
        socialAccounts: { select: { id: true, platform: true, username: true, userId: true, createdAt: true } },
      },
    });
    return interestsUsers;
  }

  async getUsersByPurchases(purchase: string[]): Promise<ProfileUser[]> {
    const purchasesUsers = this.prisma.user.findMany({
      where: { purchases: { hasEvery: purchase } },
      select: {
        id: true,
        email: true,
        hashedPassword: true,
        admin: true,
        name: true,
        cpf: true,
        rg: true,
        address: true,
        score: true,
        lastLogin: true,
        interests: true,
        eventsAttended: true,
        purchases: true,
        createdAt: true,
        updatedAt: true,
        documents: { select: { id: true, url: true, userId: true, createdAt: true } },
        socialAccounts: { select: { id: true, platform: true, username: true, userId: true, createdAt: true } },
      },
    });
    return purchasesUsers;
  }

  async deleteUser(id: string): Promise<User> {
    const findUser = await this.prisma.user.findUnique({ where: { id } });

    if (!findUser) {
      throw new Error('User does not exist');
    }

    const deletedUser = await this.prisma.user.delete({ where: { id } });

    return deletedUser;
  }

  async update(id: string, newData: UpdateUserDto): Promise<User> {
    const { documents, socialAccounts, ...restData } = newData;
  
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        ...restData,
        ...(documents && {
          documents: {
            set: documents.map((doc) => ({ id: doc.id })),
          },
        }),
        ...(socialAccounts && {
          socialAccounts: {
            set: socialAccounts.map((account) => ({ id: account.id })),
          },
        }),
      },
    });
  
    return updatedUser;
  }
}