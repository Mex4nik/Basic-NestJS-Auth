import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import CreateUserDto from './dto/createUser.dto';
import UpdateUserDto from './dto/updateUser.dto';
import User from './entities/user.entity';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Create new user',
  })
  @Post()
  create(@Body() body: CreateUserDto): Promise<User> {
    return this.userService.createUser(body);
  }

  @ApiOperation({
    summary: 'Get all users from DB',
  })
  @Get()
  getAll(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @ApiOperation({
    summary: 'Get one user by id',
  })
  @Get(':id')
  getById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(+id);
  }

  @ApiOperation({
    summary: 'Update one user by id',
  })
  @Patch(':id')
  updateById(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(+id, body);
  }

  @ApiOperation({
    summary: 'Delete one user by id',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUser(+id);
  }
}
