import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { ValidationPipe } from 'src/validations/validation.pipe';

import { AuthService } from './auth.service';
import { AuthUserDto } from './dtos/auth-user.dto';
import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async login(
    @Body(new ValidationPipe()) user: AuthUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      const { access_token } = await this.authService.login(user);

      response.cookie('access_token', access_token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days
        secure: process.env.NODE_ENV === 'production',
      });

      return { access_token };
    } catch (error) {
      return new HttpException(error.message, error.status);
    }
  }

  @UseGuards(AuthGuard)
  @Get('verify-token')
  verifyToken(@Req() request: Request) {
    try {
      const token = request.cookies['access_token'];
      if (!token) {
        return new UnauthorizedException({ isAuthenticated: false });
      }

      return { isAuthenticated: true };
    } catch {
      return new UnauthorizedException({ isAuthenticated: false });
    }
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token');
    return { message: 'OK' };
  }
}
