import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ISpecialtyRepository } from '../../domain/repositories/specialty.repository.interface';
import { Specialty } from '../../domain/entities/specialty.entity';
import { TypeOrmSpecialtyEntity } from '../persistence/typeorm-specialty.entity';
import { SpecialtyMapper } from '../mappers/specialty.mapper';

@Injectable()
export class TypeOrmSpecialtyRepository implements ISpecialtyRepository {
  constructor(
    @InjectRepository(TypeOrmSpecialtyEntity)
    private readonly repository: Repository<TypeOrmSpecialtyEntity>,
    private readonly mapper: SpecialtyMapper,
  ) {}

  async save(specialty: Specialty): Promise<void> {
    const entity = this.mapper.mapToORM(specialty);
    await this.repository.save(entity);
  }

  async findById(id: string): Promise<Specialty | null> {
    const entity = await this.repository.findOneBy({ id });
    return entity ? this.mapper.mapToDomain(entity) : null;
  }

  async findAll(): Promise<Specialty[]> {
    const entities = await this.repository.find();
    return entities.map((e) => this.mapper.mapToDomain(e));
  }

  async findByName(name: string): Promise<Specialty | null> {
    const entity = await this.repository.findOneBy({ name });
    return entity ? this.mapper.mapToDomain(entity) : null;
  }
}
