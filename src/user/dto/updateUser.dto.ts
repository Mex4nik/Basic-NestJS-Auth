import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ type: String, default: '' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String, default: '' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export default UpdateUserDto;
