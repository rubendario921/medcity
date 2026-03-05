export class DoctorSchedule {
  constructor(
    public readonly id: string,
    public readonly doctorId: string,
    public readonly dayOfWeek: number, // 0 (Sunday) to 6 (Saturday)
    public readonly startTime: string, // "HH:mm"
    public readonly endTime: string, // "HH:mm"
    public readonly isActive: boolean = true,
  ) {
    if (dayOfWeek < 0 || dayOfWeek > 6) {
      throw new Error('Day of week must be between 0 and 6');
    }
  }
}
