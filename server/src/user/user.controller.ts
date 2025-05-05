/* eslint-disable prettier/prettier */
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    UseGuards,
    Post
  } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiBody } from '@nestjs/swagger';
import { AdminGuard } from '../guard/admin.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CaslAbilityFactory } from '../casl/casl-ability.factory/casl-ability.factory';
import { ProfileUser } from './dto/pick-user.dto';
import { GetCurrentUserId } from '../common/decorators/get-current-user-id.decorator';
import { Profile } from 'passport';
  
@ApiTags('user')
@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private abilityFactory: CaslAbilityFactory,
    ) {}

    @Get()
    @ApiBearerAuth()
    async getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get('/profile/')
    @ApiBearerAuth()
    async findOne(@GetCurrentUserId() userID: string,): Promise<ProfileUser> {
        return this.userService.findOne(userID);
    }

    @Get('/profile/:email')
    @ApiBearerAuth()
    async findByEmail(@Param('email') email: string): Promise<ProfileUser> {
        return this.userService.findByEmail(email);
    }

    @Post('interests')
    @UseGuards(AdminGuard)
    @ApiBearerAuth()
    async getUsersByInterests(
        @Body() interests: string[]
    ): Promise<ProfileUser[]> {
        return this.userService.getUsersInterestsByTopic(interests);
    }

    @Post('events')
    @UseGuards(AdminGuard)
    @ApiBearerAuth()
    async getUsersByEvents(
        @Body() events: string[],
    ): Promise<ProfileUser[]> {
        return this.userService.getUsersAttendedByEvent(events);
    }

    @Post('purchases')
    @UseGuards(AdminGuard)
    @ApiBearerAuth()
    async getUsersByPurchases(
        @Body() purchases: string[]
    ): Promise<ProfileUser[]> {
        return this.userService.getUsersByPurchases(purchases);
    }

    @Delete('/delete/:id')
    @UseGuards(AdminGuard)
    @ApiBearerAuth()
    async deleteUser(@Param('id') id: string): Promise<User> {
        return this.userService.deleteUser(id);
    }

    @Patch(':id')
    @ApiBearerAuth()
    async update(
        @Param('id') id: string,
        @Body() newData: UpdateUserDto,
    ): Promise<User> {
        return await this.userService.update(id, newData);
    }
}