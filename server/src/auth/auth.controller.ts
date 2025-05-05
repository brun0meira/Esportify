/* eslint-disable prettier/prettier */
import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
  } from '@nestjs/common';
  
  import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
  import { GetCurrentUser, GetCurrentUserId, Public } from '../common/decorators';
  import { RtGuard } from '../common/guards';
  import { AuthService } from './auth.service';
  import { AuthDto, AuthLoginDto } from './dto';
  import { Tokens } from './types';
  
  @ApiTags('auth')
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @Public()
    @Post('signup')
    @ApiResponse({
      status: 200,
      description: 'Everything works as expected',
      type: AuthDto,
    })
    @ApiResponse({
      status: 403,
      description: 'Forbbiden',
    })
    @HttpCode(HttpStatus.CREATED)
    signupLocal(@Body() dto: AuthDto): Promise<Tokens> {
      return this.authService.signupLocal(dto);
    }
  
    @Public()
    @Post('signin')
    @ApiResponse({
      status: 200,
      description: 'Everything works as expected',
    })
    @ApiResponse({
      status: 403,
      description: 'The route exists, but the program can not get in there',
    })
    @ApiBearerAuth()
    @HttpCode(HttpStatus.OK)
    signinLocal(@Body() dto: AuthLoginDto): Promise<Tokens> {
      return this.authService.signinLocal(dto);
    }
  
    @Post('logout')
    @ApiBearerAuth()
    @HttpCode(HttpStatus.OK)
    logout(@GetCurrentUserId() userId: string): Promise<boolean> {
      return this.authService.logout(userId);
    }
  
    @Public()
    @UseGuards(RtGuard)
    @Post('refresh')
    @ApiBearerAuth()
    @HttpCode(HttpStatus.OK)
    refreshTokens(
      @GetCurrentUserId() userId: string,
      @GetCurrentUser('refreshToken') refreshToken: string,
    ): Promise<Tokens> {
      return this.authService.refreshTokens(userId, refreshToken);
    }
  }