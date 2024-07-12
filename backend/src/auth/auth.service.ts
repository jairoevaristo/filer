import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { AuthUserDto } from './dtos/auth-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(user: AuthUserDto) {
    const { email, password } = user;
    const isExistsUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!isExistsUser) {
      throw new NotFoundException('User not found');
    }

    const comparePassword = await compare(password, isExistsUser.password);

    if (!comparePassword) {
      throw new UnauthorizedException('Invalid e-mail or password');
    }

    const access_token = await this.jwtService.signAsync({
      sub: isExistsUser.id,
      email: isExistsUser.email,
    });

    return { access_token };
  }
}
