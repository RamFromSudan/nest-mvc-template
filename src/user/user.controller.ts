import { Body, Controller, Get, Post, Query, Render, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { RegisterDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/register')
  @Render('registration')
  @ApiExcludeEndpoint()
  register() {
    return {};
  }

  @Post('/register')
  @ApiExcludeEndpoint()
  postRegister(@Body() dto: RegisterDto) {
    return this.userService.create(dto);
  }

  @Get('/verify')
  @Render('verify')
  @ApiExcludeEndpoint()
  async verify(@Query('token') token: string) {
    try {
      await this.userService.verifyEmail(token);
      return { isVerified: true };
    } catch (e: any) {
      return { isVerified: false, error: e.message };
    }
  }
}
