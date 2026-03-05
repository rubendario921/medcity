export enum AppointmentStatusEnum {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

export class AppointmentStatus {
  constructor(private readonly value: AppointmentStatusEnum) {}

  getValue(): AppointmentStatusEnum {
    return this.value;
  }

  static pending(): AppointmentStatus {
    return new AppointmentStatus(AppointmentStatusEnum.PENDING);
  }

  static confirmed(): AppointmentStatus {
    return new AppointmentStatus(AppointmentStatusEnum.CONFIRMED);
  }

  static cancelled(): AppointmentStatus {
    return new AppointmentStatus(AppointmentStatusEnum.CANCELLED);
  }

  static completed(): AppointmentStatus {
    return new AppointmentStatus(AppointmentStatusEnum.COMPLETED);
  }
}
