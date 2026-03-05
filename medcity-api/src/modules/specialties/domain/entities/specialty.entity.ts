import { SpecialtyName } from '../value-object/specialty-name.vo';
import { SpecialtyDescription } from '../value-object/specialty-description.vo';

export class Specialty {
  constructor(
    public readonly id: string,
    public readonly name: SpecialtyName,
    public readonly description: SpecialtyDescription,
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date(),
  ) {}
}
