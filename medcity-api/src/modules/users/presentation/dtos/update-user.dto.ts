import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UpdateUserDto {
  @ApiProperty({ example: "Ruben Dario", description: "Nombre del Usuario" })
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({
    example: "Carrillo Lopez",
    description: "Apellido del Usuario",
  })
  @IsString()
  @IsNotEmpty()
  lastName?: string;

  @ApiProperty({ example: "DNI", description: "Tipo de Identificacion" })
  @IsString()
  @IsNotEmpty()
  typeDocument?: string;

  @ApiProperty({
    example: "D1234567890",
    description: "Numero de Identificacion",
  })
  @IsString()
  @IsNotEmpty()
  numberDocument?: string;

  @ApiProperty({
    example: "ruben.carrillo@example.com",
    description: "Correo Electronico",
  })
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @ApiProperty({ example: "1234567890", description: "Numero de telefono" })
  @IsString()
  @IsNotEmpty()
  numberPhone?: string;

}
