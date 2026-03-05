import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmAppointmentEntity } from './infrastructure/persistence/typeorm-appointment.entity';
import { AppointmentMapper } from './infrastructure/mappers/appointment.mapper';
import { TypeOrmAppointmentRepository } from './infrastructure/adapters/appointment.repository.adapter';
import { GetAvailableSlotsUseCase } from './application/use-cases/get-available-slots.use-case';
import { CreateAppointmentUseCase } from './application/use-cases/create-appointment.use-case';
import { AppointmentsController } from './presentation/controllers/appointments.controller';
import { DoctorsModule } from '../doctors/doctors.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeOrmAppointmentEntity]),
    DoctorsModule,
  ],
  controllers: [AppointmentsController],
  providers: [
    AppointmentMapper,
    {
      provide: 'IAppointmentRepository',
      useClass: TypeOrmAppointmentRepository,
    },
    GetAvailableSlotsUseCase,
    CreateAppointmentUseCase,
  ],
})
export class AppointmentsModule {}
