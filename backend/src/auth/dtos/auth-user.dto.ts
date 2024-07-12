import { IsNotEmpty, IsEmail } from 'class-validator';

export class AuthUserDto {
  @IsEmail({ allow_display_name: true }, { message: 'E-mail is required' })
  email: string;

  @IsNotEmpty({ message: 'password cannot be empty' })
  password: string;
}
