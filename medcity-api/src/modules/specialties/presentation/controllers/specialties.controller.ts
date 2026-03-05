import { Controller, Get } from '@nestjs/common';
import { ListSpecialtiesUseCase } from '../../application/use-cases/list-specialties.use-case';
import { SpecialtyResponseDto } from '../../application/dtos/specialty-response.dto';

@Controller('specialties')
export class SpecialtiesController {
  constructor(
    private readonly listSpecialtiesUseCase: ListSpecialtiesUseCase,
  ) {}

  @Get()
  async findAll(): Promise<SpecialtyResponseDto[]> {
    return this.listSpecialtiesUseCase.execute();
  }
}
