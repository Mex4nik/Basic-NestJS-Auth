import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import CreateUserDto from './dto/createUser.dto';
import UpdateUserDto from './dto/updateUser.dto';
import User from './entities/user.entity';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AccessTokenGuard)
  @ApiOperation({
    summary: 'Create new user',
  })
  @ApiBearerAuth()
  @Post()
  create(@Body() body: CreateUserDto): Promise<User> {
    return this.userService.createUser(body);
  }

  @UseGuards(AccessTokenGuard)
  @ApiOperation({
    summary: 'Get all users from DB',
  })
  @ApiBearerAuth()
  @Get()
  getAll(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @UseGuards(AccessTokenGuard)
  @ApiOperation({
    summary: 'Get one user by id',
  })
  @ApiBearerAuth()
  @Get(':id')
  getById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(+id);
  }

  @UseGuards(AccessTokenGuard)
  @ApiOperation({
    summary: 'Update one user by id',
  })
  @ApiBearerAuth()
  @Patch(':id')
  updateById(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(+id, body);
  }

  @UseGuards(AccessTokenGuard)
  @ApiOperation({
    summary: 'Delete one user by id',
  })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUser(+id);
  }
}
