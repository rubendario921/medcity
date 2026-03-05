import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('doctor_schedules')
export class TypeOrmDoctorScheduleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  doctorId: string;

  @Column()
  dayOfWeek: number;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @Column({ default: true })
  isActive: boolean;
}
