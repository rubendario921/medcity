import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IDoctorScheduleRepository } from '../../domain/repositories/doctor-schedule.repository.interface';
import { DoctorSchedule } from '../../domain/entities/doctor-schedule.entity';
import { TypeOrmDoctorScheduleEntity } from '../persistence/typeorm-doctor-schedule.entity';
import { DoctorScheduleMapper } from '../mappers/doctor-schedule.mapper';

@Injectable()
export class TypeOrmDoctorScheduleRepository implements IDoctorScheduleRepository {
  constructor(
    @InjectRepository(TypeOrmDoctorScheduleEntity)
    private readonly repository: Repository<TypeOrmDoctorScheduleEntity>,
    private readonly mapper: DoctorScheduleMapper,
  ) {}

  async save(schedule: DoctorSchedule): Promise<void> {
    const entity = this.mapper.mapToORM(schedule);
    await this.repository.save(entity);
  }

  async findByDoctor(doctorId: string): Promise<DoctorSchedule[]> {
    const entities = await this.repository.findBy({ doctorId });
    return entities.map((e) => this.mapper.mapToDomain(e));
  }

  async findByDoctorAndDay(
    doctorId: string,
    dayOfWeek: number,
  ): Promise<DoctorSchedule[]> {
    const entities = await this.repository.findBy({ doctorId, dayOfWeek });
    return entities.map((e) => this.mapper.mapToDomain(e));
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
