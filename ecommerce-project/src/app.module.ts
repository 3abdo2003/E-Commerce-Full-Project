/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
//import { UserModule } from './users/user.module'
//import { MongooseModule } from '@nestjs/mongoose'
//import { UserService } from './users/user.service';
//import {databaseProviders} from './users/database/database.providers';
import { UserModule } from './users/user.module';
import { MailerService } from './users/mail.service';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService,MailerService],
})
export class AppModule {}

