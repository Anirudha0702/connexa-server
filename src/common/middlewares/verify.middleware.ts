import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class VerifyMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      req['user'] = decoded;

      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
