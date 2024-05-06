/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Inject } from '@nestjs/common'
import { Model } from 'mongoose';
import { Users } from './interface/user.interface'
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/user.dto'; 
import { ResetPasswordRequestDto } from './dto/user.dto';
import * as _ from 'lodash';
import { MailerService } from './mail.service';
@Injectable()
export class UserService {
  constructor(
    @Inject('USERS_MODEL')
    private userModel: Model<Users>,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  async validateUser(loginDto: LoginUserDto) {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email }).exec();
    console.log('searching for user');
    console.log('User:', user);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== password) {
      throw new UnauthorizedException('Invalid password');
    }

    // If email and password are correct, generate token and update user
    console.log('User logged in:', email);
    const token = this.jwtService.sign({ email });
    user.token = token; // Assign token to the user
    console.log('Token generated:', token);

    // Save the updated user object with the new token to the database
    const updatedUser = await user.save();

    console.log('User object:', updatedUser); // Log the updated user object before returning
    return updatedUser;
  }


  async resetPasswordRequest(resetPasswordRequestDto: ResetPasswordRequestDto) {
    const { email } = resetPasswordRequestDto;
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const token = this.jwtService.sign({ email });
    user.resetPasswordToken = token; // Save the token to the user
    await user.save(); // Save the user
  
    // Send email with reset password link containing token
    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset Password',
      text: `Click the following link to reset your password: http://localhost:4000/user/reset-password?token=${token}`,
    });
  
    return { message: 'Email sent with reset password instructions' };
  }
  
  async resetPassword(token: string, newPassword: string) {
    console.log('Receving reset password request ' + token + ' ' + newPassword);
    const user = await this.userModel.findOne({ resetPasswordToken: token }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.password = newPassword; // Update the password
    user.resetPasswordToken = null; // Clear the reset password token
    await user.save(); // Save the user
  
    return { message: 'Password reset successful' };
  }
}




