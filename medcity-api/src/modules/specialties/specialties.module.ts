import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmSpecialtyEntity } from './infrastructure/persistence/typeorm-specialty.entity';
import { SpecialtyMapper } from './infrastructure/mappers/specialty.mapper';
import { TypeOrmSpecialtyRepository } from './infrastructure/adapters/specialty.repository.adapter';
import { ListSpecialtiesUseCase } from './application/use-cases/list-specialties.use-case';
import { SpecialtiesController } from './presentation/controllers/specialties.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmSpecialtyEntity])],
  controllers: [SpecialtiesController],
  providers: [
    SpecialtyMapper,
    {
      provide: 'ISpecialtyRepository',
      useClass: TypeOrmSpecialtyRepository,
    },
    ListSpecialtiesUseCase,
  ],
  exports: ['ISpecialtyRepository'],
})
export class SpecialtiesModule {}
