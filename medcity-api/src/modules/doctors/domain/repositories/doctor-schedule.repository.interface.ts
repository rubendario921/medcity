import { DoctorSchedule } from '../entities/doctor-schedule.entity';

export interface IDoctorScheduleRepository {
  save(schedule: DoctorSchedule): Promise<void>;
  findByDoctor(doctorId: string): Promise<DoctorSchedule[]>;
  findByDoctorAndDay(
    doctorId: string,
    dayOfWeek: number,
  ): Promise<DoctorSchedule[]>;
  delete(id: string): Promise<void>;
}
