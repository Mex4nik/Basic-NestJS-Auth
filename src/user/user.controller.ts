import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create() {
    return 'Create one user';
  }

  @Get()
  getAll(): string {
    return this.userService.getHello();
  }

  @Get(':id')
  getById(@Param('id') id: string): string {
    return 'Get by id';
  }

  @Patch(':id')
  updateById(@Param('id') id: string) {
    return 'updateById';
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return 'Delete by id';
  }
}
