import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ type: String, default: '' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String, default: '' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export default CreateUserDto;
