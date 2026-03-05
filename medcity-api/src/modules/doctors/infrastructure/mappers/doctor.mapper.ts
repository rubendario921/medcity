import { Injectable } from '@nestjs/common';
import { Doctor } from '../../domain/entities/doctor.entity';
import { TypeOrmDoctorEntity } from '../persistence/typeorm-doctor.entity';
import { RegistrationNumber } from '../../domain/value-object/registration-number.vo';

@Injectable()
export class DoctorMapper {
  mapToDomain(entity: TypeOrmDoctorEntity): Doctor {
    return new Doctor(
      entity.id,
      entity.userId,
      entity.specialtyId,
      new RegistrationNumber(entity.registrationNumber),
      entity.isAvailable,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  mapToORM(doctor: Doctor): TypeOrmDoctorEntity {
    const entity = new TypeOrmDoctorEntity();
    entity.id = doctor.id;
    entity.userId = doctor.userId;
    entity.specialtyId = doctor.specialtyId;
    entity.registrationNumber = doctor.registrationNumber.getValue();
    entity.isAvailable = doctor.isAvailable;
    entity.createdAt = doctor.createdAt;
    entity.updatedAt = doctor.updatedAt;
    return entity;
  }
}
