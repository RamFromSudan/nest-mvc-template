import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (user) {
      if (user.dateVerified !== null) {
        if (await compare(pass, user.password)) {
          const { password, ...result } = user;
          return result;
        }
        throw new UnauthorizedException({
          message: 'Invalid username/password',
        });
      }
      throw new UnauthorizedException({ message: 'User not verified' });
    }
    throw new UnauthorizedException({ message: 'Invalid username/password' });
  }

  async login(user: User) {
    return {
      access_token: this.jwtService.sign({
        userId: user.id,
        username: user.username,
      }),
    };
  }
}
