import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  login(@Body() credentials: { email: string; password: string }) {
    // create DTO
    this.authService.login(credentials);
  }
  @Post('signup')
  signUp(@Body() credentials: CreateUserDto) {
    //create DTO
    this.authService.signUp(credentials);
  }
}
