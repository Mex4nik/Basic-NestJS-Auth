import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { SignInUserDto, SignUpUserDto } from './dto/auth.dto';
import { AccessTokenGuard } from './guards/accessToken.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'User signup',
  })
  @Post('signup')
  signup(@Body() signUpUserDto: SignUpUserDto) {
    return this.authService.signUp(signUpUserDto);
  }

  @ApiOperation({
    summary: 'User signin',
  })
  @Post('signin')
  signin(@Body() data: SignInUserDto) {
    return this.authService.signIn(data);
  }

  @ApiOperation({
    summary: 'Refresh user token with access token',
  })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['sub'];
    return this.authService.refreshTokens(userId);
  }

  @ApiOperation({
    summary: 'User logout',
  })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Headers('Authorization') auth: string) {
    const accessToken = auth.split(' ')[1];
    this.authService.logout(accessToken);
  }
}
