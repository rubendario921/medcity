import { Doctor } from '../entities/doctor.entity';

export interface IDoctorRepository {
  save(doctor: Doctor): Promise<void>;
  findById(id: string): Promise<Doctor | null>;
  findBySpecialty(specialtyId: string): Promise<Doctor[]>;
  findByUserId(userId: string): Promise<Doctor | null>;
  findAll(): Promise<Doctor[]>;
}
