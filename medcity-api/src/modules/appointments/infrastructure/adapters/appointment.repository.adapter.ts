import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { IAppointmentRepository } from '../../domain/repositories/appointment.repository.interface';
import { Appointment } from '../../domain/entities/appointment.entity';
import { TypeOrmAppointmentEntity } from '../persistence/typeorm-appointment.entity';
import { AppointmentMapper } from '../mappers/appointment.mapper';

@Injectable()
export class TypeOrmAppointmentRepository implements IAppointmentRepository {
  constructor(
    @InjectRepository(TypeOrmAppointmentEntity)
    private readonly repository: Repository<TypeOrmAppointmentEntity>,
    private readonly mapper: AppointmentMapper,
  ) {}

  async save(appointment: Appointment): Promise<void> {
    const entity = this.mapper.mapToORM(appointment);
    await this.repository.save(entity);
  }

  async findById(id: string): Promise<Appointment | null> {
    const entity = await this.repository.findOneBy({ id });
    return entity ? this.mapper.mapToDomain(entity) : null;
  }

  async findByPatient(patientId: string): Promise<Appointment[]> {
    const entities = await this.repository.findBy({ patientId });
    return entities.map((e) => this.mapper.mapToDomain(e));
  }

  async findByDoctorAndTime(
    doctorId: string,
    start: Date,
    end: Date,
  ): Promise<Appointment[]> {
    const entities = await this.repository.find({
      where: {
        doctorId,
        scheduledAt: Between(start, end),
      },
    });
    return entities.map((e) => this.mapper.mapToDomain(e));
  }

  async findAll(): Promise<Appointment[]> {
    const entities = await this.repository.find();
    return entities.map((e) => this.mapper.mapToDomain(e));
  }
}
