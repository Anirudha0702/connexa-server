import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../user/dtos/create-user.req';
import { UserService } from '../../user/services/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/modules/user/model/user.model';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(credentials: { email: string; password: string }) {
    try {
      if (!credentials || Object.keys(credentials).length === 0) {
        throw new HttpException(
          'Request body is required',
          HttpStatus.BAD_REQUEST,
        );
      }
      const user = await this.userService.findOneByEmail(credentials.email);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const isPasswordMatch = await bcrypt.compare(
        credentials.password,
        user.password,
      );
      if (!isPasswordMatch) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
      const { access_token, refresh_token } = await this.generateTokens({
        email: user.email,
        sub: user._id.toString(),
      });
      await this.userService.updateToken(user.email, refresh_token);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, refreshToken, ...info } = user.toObject();
      return { ...info, access_token };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        console.error('Error logging in:', error);
        throw new HttpException(
          'An unexpected error occurred',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
  async hashPassword(plainPassword: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    return hashedPassword;
  }
  async signUp(credentials: CreateUserDto) {
    if (!credentials || Object.keys(credentials).length === 0) {
      throw new HttpException(
        'Request body is required',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await this.hashPassword(credentials.password);
    credentials.password = '' + hashedPassword;
    const user: User = {
      ...credentials,
      emailVerified: false,
      following: [],
      followers: [],
      photoURL: '',
      refreshToken: '',
    };
    return await this.userService.create(user);
  }
  async generateTokens(payload: { email: string; sub: string }) {
    const refreshToken = this.jwtService.sign(
      { payload },
      { expiresIn: '30d' },
    );
    const access_token = this.jwtService.sign({ payload }, { expiresIn: '1d' });
    return { access_token, refresh_token: refreshToken };
  }
}
