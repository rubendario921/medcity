import { IsEmail, IsString } from 'class-validator';
import { MinLength } from 'class-validator/types/decorator/string/MinLength';

export class UserDto {
  @IsString()
  @MinLength(3, { message: 'The name must be at least 3 characters long' })
  name: string;

  @IsString()
  @MinLength(5, { message: 'The lastName must be at least 5 characters long' })
  lastName: string;

  @IsString()
  @MinLength(2, {
    message: 'The typeDocument must be at least 2 characters long',
  })
  typeDocument: string;

  @IsString()
  @MinLength(10, {
    message: 'The numberDocument must be at least 10 characters long',
  })
  numberDocument: string;

  @IsEmail({}, { message: 'The email must be valid' })
  email: string;

  @IsString()
  @MinLength(10, {
    message: 'The numberPhone must be at least 10 characters long',
  })
  numberPhone: string;
}
