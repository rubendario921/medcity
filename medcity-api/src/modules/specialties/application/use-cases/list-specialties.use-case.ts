import { Inject, Injectable } from '@nestjs/common';
import type { ISpecialtyRepository } from '../../domain/repositories/specialty.repository.interface';
import { SpecialtyResponseDto } from '../dtos/specialty-response.dto';

@Injectable()
export class ListSpecialtiesUseCase {
  constructor(
    @Inject('ISpecialtyRepository')
    private readonly specialtyRepository: ISpecialtyRepository,
  ) {}

  async execute(): Promise<SpecialtyResponseDto[]> {
    const specialties = await this.specialtyRepository.findAll();
    return specialties.map((s) => ({
      id: s.id,
      name: s.name.getValue(),
      description: s.description.getValue(),
    }));
  }
}
