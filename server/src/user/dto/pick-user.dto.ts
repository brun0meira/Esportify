/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { Document, SocialAccount } from '@prisma/client';
import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  IsUUID,
  IsArray
} from 'class-validator';

export class ProfileUser {
    @IsUUID()
    @ApiProperty({ example: 'haxb3yziw1', description: 'Unique identifier of the user' })
    id: string;
  
    @IsEmail()
    @ApiProperty({ example: 'ana@gmail.com', description: 'Email of the user' })
    email: string;
  
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    @ApiProperty({ example: 'furia123', description: 'Password of the user' })
    hashedPassword: string;

    @IsBoolean()
    admin: boolean;
  
    @IsString()
    @ApiProperty({ example: 'Ana Clara', description: 'Name of the user' })
    name: string;
  
    @IsString()
    @ApiProperty({ example: '12345678901', description: 'CPF of the user' })
    cpf: string;
  
    @IsString()
    @ApiProperty({ example: 'Rua ABC, 123', description: 'Address of the user' })
    address: string;
  
    @IsArray()
    @ApiProperty({ example: ['Coding', 'Reading'], description: 'Interests of the user' })
    interests: string[];
  
    @IsArray()
    @ApiProperty({ example: ['Event1', 'Event2'], description: 'Events attended by the user' })
    eventsAttended: string[];
  
    @IsArray()
    @ApiProperty({ example: ['Purchase1', 'Purchase2'], description: 'Purchases made by the user' })
    purchases: string[];
  
    @IsOptional()
    documents?: Document[];
  
    @IsOptional()
    socialAccounts?: SocialAccount[];
}