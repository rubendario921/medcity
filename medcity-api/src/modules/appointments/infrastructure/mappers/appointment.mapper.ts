import { Injectable } from '@nestjs/common';
import { Appointment } from '../../domain/entities/appointment.entity';
import { TypeOrmAppointmentEntity } from '../persistence/typeorm-appointment.entity';
import {
  AppointmentStatus,
  AppointmentStatusEnum,
} from '../../domain/value-object/appointment-status.vo';

@Injectable()
export class AppointmentMapper {
  mapToDomain(entity: TypeOrmAppointmentEntity): Appointment {
    return new Appointment(
      entity.id,
      entity.patientId,
      entity.doctorId,
      entity.specialtyId,
      entity.scheduledAt,
      new AppointmentStatus(entity.status as AppointmentStatusEnum),
      entity.createdAt,
      entity.updatedAt,
    );
  }

  mapToORM(appointment: Appointment): TypeOrmAppointmentEntity {
    const entity = new TypeOrmAppointmentEntity();
    entity.id = appointment.id;
    entity.patientId = appointment.patientId;
    entity.doctorId = appointment.doctorId;
    entity.specialtyId = appointment.specialtyId;
    entity.scheduledAt = appointment.scheduledAt;
    entity.status = appointment.status.getValue();
    entity.createdAt = appointment.createdAt;
    entity.updatedAt = appointment.updatedAt;
    return entity;
  }
}
