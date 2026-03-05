import { RegistrationNumber } from '../value-object/registration-number.vo';

export class Doctor {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly specialtyId: string,
    public readonly registrationNumber: RegistrationNumber,
    public readonly isAvailable: boolean = true,
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date(),
  ) {}
}
