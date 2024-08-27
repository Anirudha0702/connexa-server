import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../model/user.model';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: User) {
    return this.userService.create(createUserDto);
  }
}
