import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  create(userInfo: CreateUserDto): Promise<User> {
    const user: User = new User();
    user.firstname = userInfo.firstname;
    user.lastname = userInfo.lastname;
    user.email = userInfo.email;
    user.password = userInfo.password;
    user.emailVerified = userInfo.emailVerified;
    user.followers = [];
    user.follows = [];
    user.dob = userInfo.dob;
    user.username = userInfo.username;
    return this.userRepository.save(user);
  }

  findAll() {
    throw new NotImplementedException();
  }

  findOne(id: number) {
    throw new NotImplementedException();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    throw new NotImplementedException();
  }
  findOneByEmail(email: string) {
    throw new NotImplementedException();
  }
  remove(id: number) {
    throw new NotImplementedException();
  }
}
