import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import User from './entities/user.entity';
import { UserService } from './user.service';
import UpdateUserDto from './dto/updateUser.dto';
import CreateUserDto from './dto/createUser.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() body: CreateUserDto): Promise<User> {
    return this.userService.createUser(body);
  }

  @Get()
  getAll(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(+id);
  }

  @Patch(':id')
  updateById(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUser(+id);
  }
}
