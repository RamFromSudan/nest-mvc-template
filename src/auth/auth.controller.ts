import {
  Controller,
  Get,
  Post,
  Request,
  Res,
  Render,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthExceptionFilter } from './filters/auth-exception.filter';
import { LoginGuard } from './guards/login.guard';

@Controller('auth')
@UseFilters(AuthExceptionFilter)
export class AuthController {
  @Get('/')
  @Render('login')
  @ApiExcludeEndpoint()
  index(@Request() req): { message: string } {
    return { message: req.flash('loginError') };
  }

  @UseGuards(LoginGuard)
  @Post('/login')
  @ApiExcludeEndpoint()
  login(@Res() res: Response) {
    res.redirect('/home');
  }

  @Get('/logout')
  @ApiExcludeEndpoint()
  logout(@Request() req, @Res() res: Response) {
    req.logout();
    res.redirect('/');
  }
}
