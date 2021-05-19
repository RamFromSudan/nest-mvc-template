import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/create-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('api/user')
@ApiTags('user')
export class UserApiController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registers a new user' })
  create(@Body() createUserDto: RegisterDto) {
    return this.userService.create(createUserDto);
  }

  @Get('verify')
  verify(@Query('token') token: string) {
    return this.userService.verifyEmail(token);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getUser(@Request() req) {
    return this.userService.findOne(req.user.id);
  }
}
