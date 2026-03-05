import { CreateAppointmentUseCase } from './create-appointment.use-case';
import { AppointmentStatusEnum } from '../../domain/value-object/appointment-status.vo';

describe('CreateAppointmentUseCase', () => {
  let useCase: CreateAppointmentUseCase;
  let mockDoctorRepository: any;
  let mockDoctorScheduleRepository: any;
  let mockAppointmentRepository: any;

  beforeEach(() => {
    mockDoctorRepository = {
      findBySpecialty: jest.fn(),
    };
    mockDoctorScheduleRepository = {
      findByDoctorAndDay: jest.fn(),
    };
    mockAppointmentRepository = {
      findByDoctorAndTime: jest.fn(),
      save: jest.fn(),
    };

    useCase = new CreateAppointmentUseCase(
      mockDoctorRepository,
      mockDoctorScheduleRepository,
      mockAppointmentRepository,
    );
  });

  it('should create an appointment when a doctor is available', async () => {
    const scheduledAt = new Date('2026-06-01T09:00:00'); // Monday
    const specialtyId = 'spec-1';
    const patientId = 'pat-1';

    mockDoctorRepository.findBySpecialty.mockResolvedValue([{ id: 'doc-1' }]);
    mockDoctorScheduleRepository.findByDoctorAndDay.mockResolvedValue([
      { doctorId: 'doc-1', startTime: '08:00', endTime: '12:00' },
    ]);
    mockAppointmentRepository.findByDoctorAndTime.mockResolvedValue([]);
    mockAppointmentRepository.save.mockResolvedValue(undefined);

    const result = await useCase.execute({
      patientId,
      specialtyId,
      scheduledAt,
    });

    expect(result.doctorId).toBe('doc-1');
    expect(result.status).toBe(AppointmentStatusEnum.CONFIRMED);
    expect(mockAppointmentRepository.save).toHaveBeenCalled();
  });

  it('should throw error when no doctor is available', async () => {
    const scheduledAt = new Date('2026-06-01T09:00:00');
    const specialtyId = 'spec-1';
    const patientId = 'pat-1';

    mockDoctorRepository.findBySpecialty.mockResolvedValue([{ id: 'doc-1' }]);
    mockDoctorScheduleRepository.findByDoctorAndDay.mockResolvedValue([
      { doctorId: 'doc-1', startTime: '14:00', endTime: '18:00' }, // Outside range
    ]);

    await expect(
      useCase.execute({
        patientId,
        specialtyId,
        scheduledAt,
      }),
    ).rejects.toThrow(
      'No doctor available for the selected specialty and time',
    );
  });
});
