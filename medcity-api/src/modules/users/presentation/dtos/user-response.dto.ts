import { User } from '../../domain/entities/user.entity';

export class UserResponseDto {
  id: string;
  name: string;
  lastName: string;
  typeDocument: string;
  numberDocument: string;
  email: string;
  numberPhone: string;
  createdAt: Date;
  updatedAt: Date | null;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }

  static toResponseDto(data: User): UserResponseDto {
    return new UserResponseDto({
      id: data.id,
      name: data.name!.getValue(),
      lastName: data.lastName!.getValue(),
      typeDocument: data.typeDocument!.value,
      numberDocument: data.numberDocument!.getValue(),
      email: data.email!.getValue(),
      numberPhone: data.numberPhone!.getValue(),
      createdAt: data.createdAt!.value,
      updatedAt: data.updatedAt,
    });
  }
}
