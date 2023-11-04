import { ApiProperty } from '@nestjs/swagger';

export class SignUpUserDto {
  @ApiProperty({ type: String, default: 'text@mail.com' })
  email: string;

  @ApiProperty({ type: String, default: 'your_secure_password' })
  password: string;

  @ApiProperty({ type: String, default: 'confirm_your_secure_password' })
  confirmPassword: string;
}

export class SignInUserDto {
  @ApiProperty({ type: String, default: 'text@mail.com' })
  email: string;

  @ApiProperty({ type: String, default: 'your_secure_password' })
  password: string;
}
