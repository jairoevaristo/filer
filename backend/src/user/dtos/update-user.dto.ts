import { IsEmail } from 'class-validator';

export class UpdateUserDTO {
  name?: string;
  @IsEmail(
    { allow_display_name: true },
    { message: 'Field must be a valid email' },
  )
  email?: string;
  password?: string;
}
