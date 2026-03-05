import { Specialty } from '../entities/specialty.entity';

export interface ISpecialtyRepository {
  save(specialty: Specialty): Promise<void>;
  findById(id: string): Promise<Specialty | null>;
  findAll(): Promise<Specialty[]>;
  findByName(name: string): Promise<Specialty | null>;
}
