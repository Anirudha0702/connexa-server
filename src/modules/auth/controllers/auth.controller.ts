import { Body, Controller, Param, Post, Get, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../../user/dtos/create-user.req';
import { Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async login(@Body() credentials: { email: string; password: string }) {
    return this.authService.login(credentials);
  }
  @Post('signup')
  signUp(@Body() credentials: CreateUserDto) {
    return this.authService.signUp(credentials);
  }
  @Get('verify/:validator')
  async verify(@Param('validator') validator: string, @Res() res: Response) {
    return this.authService.verify(validator, res);
  }
}
