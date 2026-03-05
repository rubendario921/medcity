import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmUserEntity } from './modules/users/infrastructure/persistence/typeorm-user.entity';
import { TypeOrmSpecialtyEntity } from './modules/specialties/infrastructure/persistence/typeorm-specialty.entity';
import { TypeOrmDoctorEntity } from './modules/doctors/infrastructure/persistence/typeorm-doctor.entity';
import { TypeOrmDoctorScheduleEntity } from './modules/doctors/infrastructure/persistence/typeorm-doctor-schedule.entity';
import { TypeOrmAppointmentEntity } from './modules/appointments/infrastructure/persistence/typeorm-appointment.entity';
import { UsersModule } from './modules/users/users.module';
import { SpecialtiesModule } from './modules/specialties/specialties.module';
import { DoctorsModule } from './modules/doctors/doctors.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT', 5432),
        database: configService.get<string>('DB_DATABASE'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        synchronize: configService.get<string>('DB_SYNCHRONIZE') === 'true',
        entities: [
          TypeOrmUserEntity,
          TypeOrmSpecialtyEntity,
          TypeOrmDoctorEntity,
          TypeOrmDoctorScheduleEntity,
          TypeOrmAppointmentEntity,
        ],
      }),
    }),
    UsersModule,
    SpecialtiesModule,
    DoctorsModule,
    AppointmentsModule,
  ],
})
export class AppModule {}
