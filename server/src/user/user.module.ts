/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from '../casl/casl-ability.factory/casl-ability.factory';
import { CaslModule } from '../casl/casl.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
@Module({
  imports: [CaslModule],
  controllers: [UserController],
  providers: [
    UserService,
    CaslAbilityFactory,
  ],
  exports: [UserService],
})
export class UserModule {}