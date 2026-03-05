import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IDoctorRepository } from '../../domain/repositories/doctor.repository.interface';
import { Doctor } from '../../domain/entities/doctor.entity';
import { TypeOrmDoctorEntity } from '../persistence/typeorm-doctor.entity';
import { DoctorMapper } from '../mappers/doctor.mapper';

@Injectable()
export class TypeOrmDoctorRepository implements IDoctorRepository {
  constructor(
    @InjectRepository(TypeOrmDoctorEntity)
    private readonly repository: Repository<TypeOrmDoctorEntity>,
    private readonly mapper: DoctorMapper,
  ) {}

  async save(doctor: Doctor): Promise<void> {
    const entity = this.mapper.mapToORM(doctor);
    await this.repository.save(entity);
  }

  async findById(id: string): Promise<Doctor | null> {
    const entity = await this.repository.findOneBy({ id });
    return entity ? this.mapper.mapToDomain(entity) : null;
  }

  async findBySpecialty(specialtyId: string): Promise<Doctor[]> {
    const entities = await this.repository.findBy({ specialtyId });
    return entities.map((e) => this.mapper.mapToDomain(e));
  }

  async findByUserId(userId: string): Promise<Doctor | null> {
    const entity = await this.repository.findOneBy({ userId });
    return entity ? this.mapper.mapToDomain(entity) : null;
  }

  async findAll(): Promise<Doctor[]> {
    const entities = await this.repository.find();
    return entities.map((e) => this.mapper.mapToDomain(e));
  }
}
