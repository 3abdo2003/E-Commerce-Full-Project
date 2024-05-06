/* eslint-disable prettier/prettier */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
//import { LocalAuthGuard } from 'src/users/local-auth.guard';
//import { LoginUserDto } from './dto/user.dto';
import { MessagePattern } from '@nestjs/microservices'
import { URL } from 'url';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('login')
  async login(command): Promise<{ token: string }> {
      console.log('Received login request:', command);
      const { email, password } = command.body;
      console.log('Email:', email, 'Password:', password); // Log email and password
      return this.userService.validateUser({ email, password }); // Pass email and password as user object
  }

  @MessagePattern('reset-password-request')
  async resetPasswordRequest(command): Promise<{ message: string }> {
    console.log('Received reset password request:', command);
    const { email } = command.body;
    console.log('Email:', email); // Log email
    return this.userService.resetPasswordRequest({ email }); // Pass email as user object
  }

  @MessagePattern('reset-password')
  async resetPassword(command): Promise<{ message: string }> {
    console.log('Received reset password:', command);
    const { token, newPassword } = command.body; // Extract token and new password from command body
    console.log('Token:', token, 'New Password:', newPassword); // Log token and new password
    return this.userService.resetPassword(token, newPassword); 
  }
  

}