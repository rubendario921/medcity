import { Injectable } from '@nestjs/common';
import { Specialty } from '../../domain/entities/specialty.entity';
import { TypeOrmSpecialtyEntity } from '../persistence/typeorm-specialty.entity';
import { SpecialtyName } from '../../domain/value-object/specialty-name.vo';
import { SpecialtyDescription } from '../../domain/value-object/specialty-description.vo';

@Injectable()
export class SpecialtyMapper {
  mapToDomain(entity: TypeOrmSpecialtyEntity): Specialty {
    return new Specialty(
      entity.id,
      new SpecialtyName(entity.name),
      new SpecialtyDescription(entity.description),
      entity.createdAt,
      entity.updatedAt,
    );
  }

  mapToORM(specialty: Specialty): TypeOrmSpecialtyEntity {
    const entity = new TypeOrmSpecialtyEntity();
    entity.id = specialty.id;
    entity.name = specialty.name.getValue();
    entity.description = specialty.description.getValue();
    entity.createdAt = specialty.createdAt;
    entity.updatedAt = specialty.updatedAt;
    return entity;
  }
}
