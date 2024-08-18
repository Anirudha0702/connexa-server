import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  login(credentials: { email: string; password: string }) {
    return 'login' + credentials;
  }
  signUp(credentials: CreateUserDto) {
    return 'signUp' + credentials;
  }
}
