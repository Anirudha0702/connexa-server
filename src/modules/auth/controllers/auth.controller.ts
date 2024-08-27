import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../../user/dtos/create-user.req';
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
}
