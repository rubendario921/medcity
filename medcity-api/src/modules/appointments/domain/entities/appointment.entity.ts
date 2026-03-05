import { AppointmentStatus } from '../value-object/appointment-status.vo';

export class Appointment {
  constructor(
    public readonly id: string,
    public readonly patientId: string,
    public readonly doctorId: string,
    public readonly specialtyId: string,
    public readonly scheduledAt: Date,
    public readonly status: AppointmentStatus,
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date(),
  ) {}
}
