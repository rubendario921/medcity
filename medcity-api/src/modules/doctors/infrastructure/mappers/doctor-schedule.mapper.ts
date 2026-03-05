import { Injectable } from '@nestjs/common';
import { DoctorSchedule } from '../../domain/entities/doctor-schedule.entity';
import { TypeOrmDoctorScheduleEntity } from '../persistence/typeorm-doctor-schedule.entity';

@Injectable()
export class DoctorScheduleMapper {
  mapToDomain(entity: TypeOrmDoctorScheduleEntity): DoctorSchedule {
    return new DoctorSchedule(
      entity.id,
      entity.doctorId,
      entity.dayOfWeek,
      entity.startTime,
      entity.endTime,
      entity.isActive,
    );
  }

  mapToORM(schedule: DoctorSchedule): TypeOrmDoctorScheduleEntity {
    const entity = new TypeOrmDoctorScheduleEntity();
    entity.id = schedule.id;
    entity.doctorId = schedule.doctorId;
    entity.dayOfWeek = schedule.dayOfWeek;
    entity.startTime = schedule.startTime;
    entity.endTime = schedule.endTime;
    entity.isActive = schedule.isActive;
    return entity;
  }
}
