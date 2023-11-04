import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserService } from './../user/user.service';
import { SignInUserDto, SignUpUserDto } from './dto/auth.dto';
import AccessToken from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private userService: UserService,
    @InjectRepository(AccessToken)
    private accessTokenRepo: Repository<AccessToken>,
  ) {}

  public async signUp(signUpUserDto: SignUpUserDto) {
    if (signUpUserDto.password !== signUpUserDto.confirmPassword)
      throw new BadRequestException('Passwords are not the same');

    const hashedPassword = await bcrypt.hash(signUpUserDto.password, 10);
    try {
      const createdUser = await this.userService.createUser({
        ...signUpUserDto,
        password: hashedPassword,
      });
      createdUser.password = undefined;

      const tokens = await this.getTokens(createdUser.id, createdUser.email);

      return {
        ...createdUser,
        ...tokens,
      };
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async signIn(data: SignInUserDto) {
    try {
      const user = await this.userService.getByEmail(data.email);
      await this.verifyPassword(data.password, user.password);
      user.password = undefined;

      const tokens = await this.getTokens(user.id, user.email);

      return { ...user, ...tokens };
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async refreshTokens(userId: string) {
    const user = await this.userService.getUserById(+userId);
    if (!user) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);

    return tokens;
  }

  private async getTokens(userId: number, email: string) {
    const accessToken = await this.jwtService.signAsync(
      {
        sub: userId,
        email,
      },
      {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: '20m',
      },
    );

    return {
      accessToken,
    };
  }

  public async logout(token: string) {
    return this.accessTokenRepo.create({ token });
  }
}
