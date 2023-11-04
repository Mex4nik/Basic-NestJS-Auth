import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export default UpdateUserDto;
