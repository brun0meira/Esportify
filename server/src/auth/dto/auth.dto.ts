/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
  IsInt
} from 'class-validator';

export class AuthDto {
  @IsString()
  @ApiProperty({ example: 'Bruno Meira', description: 'name' })
  name: string;

  @IsBoolean()
  @ApiProperty({ example: false, description: 'Site responsible' })
  admin?: boolean;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'bruno@gmail.com', description: 'email' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'furia123', description: 'password' })
  password: string;

  @IsString()
  @ApiProperty({ example: '12345678901', description: 'CPF of the user' })
  cpf: string;

  @IsString()
  @ApiProperty({ example: '12345678901', description: 'RG of the user' })
  rg: string;

  @IsString()
  @ApiProperty({ example: 'Rua ABC, 123', description: 'Address of the user' })
  address: string;

  // @IsInt()
  // @ApiProperty({ example: 0, description: 'score' })
  // score: number;

  // @IsString()
  // @ApiProperty({ example: '', description: 'Ultimo Login' })
  // lastLogin: string;

  @IsArray()
  @ApiProperty({ example: ['Coding', 'Reading'], description: 'Interests of the user' })
  interests: string[];

  @IsArray()
  @ApiProperty({ example: ['Event1', 'Event2'], description: 'Events attended by the user' })
  eventsAttended: string[];

  @IsArray()
  @ApiProperty({ example: ['Purchase1', 'Purchase2'], description: 'Purchases made by the user' })
  purchases: string[];

}

export class AuthLoginDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'bruno@gmail.com', description: 'email' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'furia123', description: 'password' })
  password: string;
}