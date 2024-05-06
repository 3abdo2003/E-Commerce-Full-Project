/* eslint-disable prettier/prettier */
import { Controller, Request, Response, Inject, OnModuleInit, Post, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { ClientKafka } from '@nestjs/microservices';
import { Query } from '@nestjs/common';

@Controller('user')
export class UserController implements OnModuleInit {

    constructor(
        private userService: UserService,
        @Inject('UserService') private readonly userClient: ClientKafka,
    ) {}

    @Post('sign-in')
        async login(@Request()req){
            console.log(req.body);
            return this.userService.login({body:req.body});
        
    }

    @Post('reset-password-request')
       async resetPasswordRequest(@Request()req){
        console.log(req.body);
        return this.userService.resetPasswordRequest({body:req.body});
       }

       @Post('reset-password')
       async resetPassword(@Request() req, @Query('token') token: string) {
         console.log(req.body);
         return this.userService.resetPassword({ 
           body: { 
             token, 
             newPassword: req.body.password // Assuming the password is in the 'password' field of the body
           } 
         });
       }
       


    onModuleInit() {
        this.userClient.subscribeToResponseOf('login');
        this.userClient.subscribeToResponseOf('reset-password-request');
        this.userClient.subscribeToResponseOf('reset-password');
    }
}

