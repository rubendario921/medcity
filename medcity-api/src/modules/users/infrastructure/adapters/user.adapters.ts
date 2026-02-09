import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmUserEntity } from '../persistence/typeorm-user.entity';
import { User } from '../../domain/entities/user.entity';
import { UserMappers } from '../mappers/user-infrastructure.mappers';

@Injectable()
export class TypeOrmUserRepository implements IUserRepository {
  constructor(
    @InjectRepository(TypeOrmUserEntity)
    private readonly repository: Repository<TypeOrmUserEntity>,
    private readonly mapper: UserMappers,
  ) {}

  async findAll(): Promise<User[]> {
    const entity = await this.repository.find();
    return entity.map((data) => this.mapper.mapToDomain(data));
  }

  async findById(id: string): Promise<User | null> {
    const entity = await this.repository.findOneBy({ id });
    if (!entity) return null;
    return this.mapper.mapToDomain(entity);
  }

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.repository.findOneBy({ email });
    if (!entity) return null;
    return this.mapper.mapToDomain(entity);
  }

  async create(user: User): Promise<User> {
    const entity = this.mapper.mapToORM(user);
    const saved = await this.repository.save(entity);
    return this.mapper.mapToDomain(saved);
  }

  async update(id: string, user: Partial<User>): Promise<User | null> {
    const entity = await this.repository.findOneBy({ id });
    if (!entity) return null;

    const data = this.mapper.mapToORM({
      ...this.mapper.mapToDomain(entity),
      ...user,
    });
    const updated = await this.repository.save(data);
    return this.mapper.mapToDomain(updated);
  }
  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    if (!result.affected || result.affected === 0) {
      return false;
    }
    return true;
  }
}
