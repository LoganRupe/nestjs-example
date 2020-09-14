import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserLoginDto } from '../users/dto/userlogin.dto';
import { LoginResponseSchema } from './schemas/login.response.schema';
import { UserDto } from '../users/dto/user.dto';


@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'User Login' })
  @ApiBody({ type: UserLoginDto })
  @ApiResponse({ status: 201, description: 'Access Token', type: LoginResponseSchema })
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get Current User Profile' })
  @ApiResponse({ status: 201, description: 'Access Token', type: UserDto })
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
