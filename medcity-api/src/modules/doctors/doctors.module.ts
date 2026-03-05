import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmDoctorEntity } from './infrastructure/persistence/typeorm-doctor.entity';
import { TypeOrmDoctorScheduleEntity } from './infrastructure/persistence/typeorm-doctor-schedule.entity';
import { DoctorMapper } from './infrastructure/mappers/doctor.mapper';
import { DoctorScheduleMapper } from './infrastructure/mappers/doctor-schedule.mapper';
import { TypeOrmDoctorRepository } from './infrastructure/adapters/doctor.repository.adapter';
import { TypeOrmDoctorScheduleRepository } from './infrastructure/adapters/doctor-schedule.repository.adapter';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TypeOrmDoctorEntity,
      TypeOrmDoctorScheduleEntity,
    ]),
  ],
  providers: [
    DoctorMapper,
    DoctorScheduleMapper,
    {
      provide: 'IDoctorRepository',
      useClass: TypeOrmDoctorRepository,
    },
    {
      provide: 'IDoctorScheduleRepository',
      useClass: TypeOrmDoctorScheduleRepository,
    },
  ],
  exports: ['IDoctorRepository', 'IDoctorScheduleRepository'],
})
export class DoctorsModule {}
