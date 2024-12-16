import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
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
  // @Get('verify/:validator')
  // async verify(@Param('validator') validator: string, @Res() res: Response) {
  //   return this.authService.verify(validator, res);
  // }
}
