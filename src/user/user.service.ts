import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hashSync } from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import { EntityManager } from 'typeorm';
import { RegisterDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly em: EntityManager,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async create(createUserDto: RegisterDto) {
    let user = this.em.create(User, {
      username: createUserDto.username,
      email: createUserDto.email,
      password: hashSync(createUserDto.password, 1),
    });

    user = await this.em.save(user);

    this._generateToken(user).then((token) => {
      this.mailService.sendUserConfirmation(user, token);
    });

    return user;
  }

  async verifyEmail(token: string) {
    const payload = this._decodeToken(token);
    if (payload === null) {
      throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
    }
    const user = await this.em.findOne(User, {
      where: { id: payload.userId, dateVerified: null },
    });

    if (user) {
      user.dateVerified = new Date();
      this.em.save(user);
      return true;
    }
    throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
  }

  findByUsername(username: string) {
    return this.em.findOne(User, {
      where: {
        username: username,
      },
    });
  }

  async findOne(id: number) {
    const user = await this.em.findOne(User, id);
    return user;
  }

  private async _generateToken(user: User) {
    const payload = { userId: user.id };
    return this.jwtService.signAsync(payload);
  }

  private _decodeToken(token: string) {
    return <any>this.jwtService.decode(token, { json: true });
  }
}
