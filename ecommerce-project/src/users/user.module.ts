/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport'; 
import { LocalStrategy } from './local.strategy'; 
import { LocalAuthGuard } from './local-auth.guard';
import {usersProviders} from './database/users.providers';
import {databaseProviders} from './database/database.providers';
import { MailerService } from './mail.service';

@Module({
imports: [
    JwtModule.register({
    secret: 'Vr8gkH#wF6zU$e@yG@2sD#J!fMkR%5p', // Secret key
    signOptions: { expiresIn: '1h' }, // Token expiration time
   }),
   PassportModule,
],
  controllers: [UserController],
  providers: [
    UserService, 
    MailerService,
    ...usersProviders,
    ...databaseProviders,
    LocalStrategy,
    LocalAuthGuard,
  ],
  exports:[...databaseProviders],
})
export class UserModule {}
