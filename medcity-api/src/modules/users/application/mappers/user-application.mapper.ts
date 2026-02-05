import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { UserResponseDto } from '../dtos/user-response.dto';
import {
  UserCreatedAt,
  UserEmail,
  UserLastName,
  UserName,
  UserNumberDocument,
  UserNumberPhone,
  UserTypeDocument,
} from '../../domain/value-object';
import { CreateUserDto, UpdateUserDto } from '../dtos';

@Injectable()
export class UserApplicationMapper {
  toResultDto(user: User): UserResponseDto {
    return new UserResponseDto({
      id: user.id!,
      name: user.name!.getValue(),
      lastName: user.lastName!.getValue(),
      typeDocument: user.typeDocument!.getValue(),
      numberDocument: user.numberDocument!.getValue(),
      email: user.email!.getValue(),
      numberPhone: user.numberPhone!.getValue(),
      createdAt: user.createdAt!.getValue(),
      updatedAt: user.updatedAt ?? null,
    });
  }

  toResultListDto(users: User[]): UserResponseDto[] {
    return users.map((user) => this.toResultDto(user));
  }

  toDomain(dto: CreateUserDto): User {
    return new User(
      '',
      new UserName(dto.name),
      new UserLastName(dto.lastName),
      new UserTypeDocument(dto.typeDocument),
      new UserNumberDocument(dto.numberDocument),
      new UserEmail(dto.email),
      new UserNumberPhone(dto.numberPhone),
      new UserCreatedAt(),
    );
  }

  toDomainUpdate(dto: UpdateUserDto): User {
    return new User(
      '',
      dto.name ? new UserName(dto.name) : undefined,
      dto.lastName ? new UserLastName(dto.lastName) : undefined,
      dto.typeDocument ? new UserTypeDocument(dto.typeDocument) : undefined,
      dto.numberDocument
        ? new UserNumberDocument(dto.numberDocument)
        : undefined,
      dto.email ? new UserEmail(dto.email) : undefined,
      dto.numberPhone ? new UserNumberPhone(dto.numberPhone) : undefined,
      new UserCreatedAt(),
      new Date(),
    );
  }
}
