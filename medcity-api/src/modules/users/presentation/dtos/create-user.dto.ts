import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'First name of the user', example: 'Ruben' })
  @IsString()
  @MinLength(3, { message: 'The name must be at least 3 characters long' })
  @IsNotEmpty({ message: 'The name is required' })
  name: string;

  @ApiProperty({ description: 'Last name of the user', example: 'Carrillo' })
  @IsString()
  @MinLength(5, { message: 'The lastName must be at least 5 characters long' })
  @IsNotEmpty({ message: 'The lastName is required' })
  lastName: string;

  @ApiProperty({ description: 'Document type (e.g., DNI, CC)', example: 'DNI' })
  @IsString()
  @MinLength(2, {
    message: 'The typeDocument must be at least 2 characters long',
  })
  @IsNotEmpty({ message: 'The typeDocument is required' })
  typeDocument: string;

  @ApiProperty({ description: 'Document number', example: '1234567890' })
  @IsString()
  @MinLength(10, {
    message: 'The numberDocument must be at least 10 characters long',
  })
  @IsNotEmpty({ message: 'The numberDocument is required' })
  numberDocument: string;

  @ApiProperty({
    description: 'User email',
    example: 'ruben.carrillo@example.com',
  })
  @IsEmail({}, { message: 'The email must be valid' })
  @IsNotEmpty({ message: 'The email is required' })
  email: string;

  @ApiProperty({ description: 'Phone number', example: '1234567890' })
  @IsString()
  @MinLength(10, {
    message: 'The numberPhone must be at least 10 characters long',
  })
  @IsNotEmpty({ message: 'The numberPhone is required' })
  numberPhone: string;
}
