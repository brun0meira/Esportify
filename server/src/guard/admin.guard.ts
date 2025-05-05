/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory } from '../casl/casl-ability.factory/casl-ability.factory';
import { Action } from '../casl/enums/role.enum';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private abilityFactory: CaslAbilityFactory,
    private prisma: PrismaService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;

    const { email } = user; // Extract the necessary properties from req.user

    const admin = await this.prisma.user
      .findUnique({
        where: { email },
        select: { admin: true },
      })
      .then((user) => user?.admin ?? false); // If user is null, default to false
  
    if (!admin) {
      throw new ForbiddenException('Only admin users can access this endpoint. Permission denied!');
    }
  
    // Create a dummy User object with the admin property
    const dummyUser: User = {
        admin,
        id: '',
        email: '',
        hashedPassword: '',
        name: '',
        cpf: '',
        rg: '',
        address: '',
        score: 0,
        lastLogin: '',
        interests: [],
        eventsAttended: [],
        purchases: [],
    };
  
    // Create the ability instance for the user
    const ability = this.abilityFactory.createForUser(dummyUser);
  
    // Check if the user has admin permissions
    const isAllowed = ability.can(Action.Manage, 'all');
  
    // Return true if the user is an admin, otherwise false
    return isAllowed;
  }
}