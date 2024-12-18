import {
  HttpException,
  HttpStatus,
  Injectable,
  NotImplementedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { VerificationEmailProducer } from '../jobs/verification-email.producer';
import { UserService } from 'src/modules/user/user.service';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly jobProducer: VerificationEmailProducer,
  ) {}
  async login(credentials: { email: string; password: string }) {
    console.log(credentials);
    try {
      if (!credentials || Object.keys(credentials).length === 0) {
        throw new HttpException(
          'Request body is required',
          HttpStatus.BAD_REQUEST,
        );
      }
      const user = await this.userService.findOneByEmail(credentials.email);
      if (!user) {
        throw new HttpException(
          `No user is found with email ${credentials.email}`,
          HttpStatus.NOT_FOUND,
        );
      }
      const isPasswordMatch = await bcrypt.compare(
        credentials.password,
        user.password,
      );
      if (!isPasswordMatch) {
        throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
      }
      const { access_token, refresh_token } = await this.generateTokens({
        email: user.email,
        sub: user.userId,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...info } = user;
      return { ...info, access_token, refresh_token };
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
      throw new HttpException('Body is required', HttpStatus.BAD_REQUEST);
    }
    try {
      const hashedPassword = await this.hashPassword(credentials.password);
      credentials.password = hashedPassword;
      const mailCipher = this.jwtService.sign(
        {
          email: credentials.email,
        },
        { expiresIn: '300s' } as JwtSignOptions,
      );
      await this.userService.create(credentials);
      await this.jobProducer.sendVerificationEmail(
        mailCipher,
        credentials.firstname,
        credentials.email,
      );
      return { message: 'User created successfully' };
    } catch (error) {
      // console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
  async generateTokens(payload: { email: string; sub: string }) {
    const access_token = this.jwtService.sign(payload, {
      expiresIn: '1d',
    } as JwtSignOptions);
    const refresh_token = this.jwtService.sign(payload, {
      expiresIn: '10d',
    } as JwtSignOptions);
    return { access_token, refresh_token };
  }
  async verify() {
    // try {
    //   const { email } = await this.jwtService.verifyAsync(validator);
    //   if (email) {
    //     await this.userService.verifyUser(email);
    //     // res.redirect('http://localhost:3000/login');
    //     res.send('<h1>Email verified successfully</h1>');
    //   }
    // } catch (error) {
    //   res.send('<h1>Invalid token or Token has expired</h1>');
    // }
    throw new NotImplementedException();
  }
}
