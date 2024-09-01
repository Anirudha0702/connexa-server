import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../model/user.model';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: User): Promise<object> {
    try {
      const createdUser = new this.userModel(user);
      await createdUser.save();
      return { message: 'User created successfully' };
    } catch (error) {
      if (error.code === 11000) {
        throw new HttpException('Email already exists', HttpStatus.CONFLICT, {
          cause: error,
        });
      }

      throw new HttpException(
        'Error creating user in the database' + error,
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }
  async findOneByEmail(email: string): Promise<UserDocument | null> {
    try {
      const user = await this.userModel.findOne({ email });
      if (user) {
        return user;
      }
      return null;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw new Error('An error occurred while retrieving the user.');
    }
  }
  async verifyUser(email: string): Promise<boolean> {
    try {
      await this.userModel.updateOne({ email }, { emailVerified: true });
      return true;
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }
}
