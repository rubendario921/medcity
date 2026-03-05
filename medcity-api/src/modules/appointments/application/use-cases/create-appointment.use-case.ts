import { Inject, Injectable } from '@nestjs/common';
import type { IDoctorRepository } from '../../../doctors/domain/repositories/doctor.repository.interface';
import type { IDoctorScheduleRepository } from '../../../doctors/domain/repositories/doctor-schedule.repository.interface';
import type { IAppointmentRepository } from '../../domain/repositories/appointment.repository.interface';
import { Appointment } from '../../domain/entities/appointment.entity';
import { AppointmentStatus } from '../../domain/value-object/appointment-status.vo';
import {
  CreateAppointmentRequestDto,
  CreateAppointmentResponseDto,
} from '../dtos/create-appointment.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class CreateAppointmentUseCase {
  constructor(
    @Inject('IDoctorRepository')
    private readonly doctorRepository: IDoctorRepository,
    @Inject('IDoctorScheduleRepository')
    private readonly doctorScheduleRepository: IDoctorScheduleRepository,
    @Inject('IAppointmentRepository')
    private readonly appointmentRepository: IAppointmentRepository,
  ) {}

  async execute(
    request: CreateAppointmentRequestDto,
  ): Promise<CreateAppointmentResponseDto> {
    const { patientId, specialtyId, scheduledAt } = request;
    const dayOfWeek = scheduledAt.getDay();
    const timeStr = this.formatTime(scheduledAt);

    const doctors = await this.doctorRepository.findBySpecialty(specialtyId);
    let assignedDoctorId: string | null = null;

    for (const doctor of doctors) {
      const schedules = await this.doctorScheduleRepository.findByDoctorAndDay(
        doctor.id,
        dayOfWeek,
      );

      const hasSchedule = schedules.some((s) => {
        return timeStr >= s.startTime && timeStr < s.endTime;
      });

      if (hasSchedule) {
        // Check availability
        const endDateTime = new Date(scheduledAt);
        endDateTime.setMinutes(endDateTime.getMinutes() + 30);

        const existingAppointments =
          await this.appointmentRepository.findByDoctorAndTime(
            doctor.id,
            scheduledAt,
            endDateTime,
          );

        if (existingAppointments.length === 0) {
          assignedDoctorId = doctor.id;
          break;
        }
      }
    }

    if (!assignedDoctorId) {
      throw new Error(
        'No doctor available for the selected specialty and time',
      );
    }

    const appointmentId = randomUUID();
    const appointment = new Appointment(
      appointmentId,
      patientId,
      assignedDoctorId,
      specialtyId,
      scheduledAt,
      AppointmentStatus.confirmed(), // Assuming immediate confirmation
    );

    await this.appointmentRepository.save(appointment);

    return {
      appointmentId: appointment.id,
      doctorId: appointment.doctorId,
      scheduledAt: appointment.scheduledAt,
      status: appointment.status.getValue(),
    };
  }

  private formatTime(date: Date): string {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  }
}
