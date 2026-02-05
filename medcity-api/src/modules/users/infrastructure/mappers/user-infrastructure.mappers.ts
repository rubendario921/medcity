import { Injectable } from '@nestjs/common';
import { TypeOrmUserEntity } from '../persistence/typeorm-user.entity';
import { User } from '../../domain/entities/user.entity';
import {
  UserName,
  UserLastName,
  UserTypeDocument,
  UserNumberDocument,
  UserEmail,
  UserCreatedAt,
  UserNumberPhone,
} from '../../domain/value-object';

@Injectable()
export class UserMappers {
  mapToDomain(data: TypeOrmUserEntity): User {
    return new User(
      data.id,
      new UserName(data.name),
      new UserLastName(data.lastName),
      new UserTypeDocument(data.typeDocument),
      new UserNumberDocument(data.numberDocument),
      new UserEmail(data.email),
      new UserNumberPhone(data.numberPhone),
      new UserCreatedAt(data.createdAt),
      data.updatedAt,
    );
  }

  mapToORM(user: User): TypeOrmUserEntity {
    const entity = new TypeOrmUserEntity();
    if (user.id) entity.id = user.id;
    entity.name = user.name?.getValue() ?? '';
    entity.lastName = user.lastName?.getValue() ?? '';
    entity.typeDocument = user.typeDocument?.getValue() ?? '';
    entity.numberDocument = user.numberDocument?.getValue() ?? '';
    entity.email = user.email?.getValue() ?? '';
    entity.numberPhone = user.numberPhone?.getValue() ?? '';
    entity.createdAt = user.createdAt?.getValue() || new Date();
    if (user.updatedAt && user.id) entity.updatedAt = user.updatedAt;
    return entity;
  }
}
