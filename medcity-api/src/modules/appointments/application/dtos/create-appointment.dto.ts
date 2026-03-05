export class CreateAppointmentRequestDto {
  patientId: string;
  specialtyId: string;
  scheduledAt: Date;
}

export class CreateAppointmentResponseDto {
  appointmentId: string;
  doctorId: string;
  scheduledAt: Date;
  status: string;
}
