import { Appointment } from '../entities/appointment.entity';

export interface IAppointmentRepository {
  save(appointment: Appointment): Promise<void>;
  findById(id: string): Promise<Appointment | null>;
  findByPatient(patientId: string): Promise<Appointment[]>;
  findByDoctorAndTime(
    doctorId: string,
    start: Date,
    end: Date,
  ): Promise<Appointment[]>;
  findAll(): Promise<Appointment[]>;
}
