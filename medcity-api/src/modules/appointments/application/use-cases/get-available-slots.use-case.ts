import { Inject, Injectable } from '@nestjs/common';
import type { IDoctorRepository } from '../../../doctors/domain/repositories/doctor.repository.interface';
import type { IDoctorScheduleRepository } from '../../../doctors/domain/repositories/doctor-schedule.repository.interface';
import type { IAppointmentRepository } from '../../domain/repositories/appointment.repository.interface';
import { AvailableSlotResponseDto } from '../dtos/available-slot-response.dto';

@Injectable()
export class GetAvailableSlotsUseCase {
  constructor(
    @Inject('IDoctorRepository')
    private readonly doctorRepository: IDoctorRepository,
    @Inject('IDoctorScheduleRepository')
    private readonly doctorScheduleRepository: IDoctorScheduleRepository,
    @Inject('IAppointmentRepository')
    private readonly appointmentRepository: IAppointmentRepository,
  ) {}

  async execute(
    specialtyId: string,
    date: Date,
  ): Promise<AvailableSlotResponseDto[]> {
    const doctors = await this.doctorRepository.findBySpecialty(specialtyId);
    if (doctors.length === 0) return [];

    const dayOfWeek = date.getDay();
    const allSlots = new Set<string>();

    for (const doctor of doctors) {
      const schedules = await this.doctorScheduleRepository.findByDoctorAndDay(
        doctor.id,
        dayOfWeek,
      );

      for (const schedule of schedules) {
        // Generate slots of 30 mins (hardcoded for now or based on config)
        const current = this.parseTime(schedule.startTime);
        const end = this.parseTime(schedule.endTime);

        while (current < end) {
          const slotTimeStr = this.formatTime(current);

          // Check if this doctor is busy at this specific time
          const startDateTime = new Date(date);
          startDateTime.setHours(
            current.getHours(),
            current.getMinutes(),
            0,
            0,
          );

          const endDateTime = new Date(startDateTime);
          endDateTime.setMinutes(endDateTime.getMinutes() + 30);

          const appointments =
            await this.appointmentRepository.findByDoctorAndTime(
              doctor.id,
              startDateTime,
              endDateTime,
            );

          if (appointments.length === 0) {
            allSlots.add(slotTimeStr);
          }

          current.setMinutes(current.getMinutes() + 30);
        }
      }
    }

    return Array.from(allSlots)
      .sort()
      .map((time) => ({
        time,
        available: true,
      }));
  }

  private parseTime(timeStr: string): Date {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

  private formatTime(date: Date): string {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  }
}
