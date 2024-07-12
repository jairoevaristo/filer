import { MinLength, IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'Field name cannot be empty' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Field e-mail cannot be empty' })
  @IsEmail(
    { allow_display_name: true },
    { message: 'Field must be a valid email' },
  )
  email: string;

  @IsNotEmpty({ message: 'Field password cannot be empty' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @IsNotEmpty({ message: 'Field avatar_url cannot be empty' })
  avatar_url: string;
}
