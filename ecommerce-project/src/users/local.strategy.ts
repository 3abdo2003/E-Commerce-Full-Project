/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from './user.service';
import { Users } from './interface/user.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super();
  }

  async validate(email: string, password: string): Promise<Users> {
    const user = await this.userService.validateUser({ email, password });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}


