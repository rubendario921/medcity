import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { GetAvailableSlotsUseCase } from '../../application/use-cases/get-available-slots.use-case';
import { CreateAppointmentUseCase } from '../../application/use-cases/create-appointment.use-case';
import {
  CreateAppointmentRequestDto,
  CreateAppointmentResponseDto,
} from '../../application/dtos/create-appointment.dto';
import { AvailableSlotResponseDto } from '../../application/dtos/available-slot-response.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(
    private readonly getAvailableSlotsUseCase: GetAvailableSlotsUseCase,
    private readonly createAppointmentUseCase: CreateAppointmentUseCase,
  ) {}

  @Get('slots')
  async getSlots(
    @Query('specialtyId', ParseUUIDPipe) specialtyId: string,
    @Query('date') date: string,
  ): Promise<AvailableSlotResponseDto[]> {
    return await this.getAvailableSlotsUseCase.execute(
      specialtyId,
      new Date(date),
    );
  }

  @Post()
  async create(
    @Body() request: CreateAppointmentRequestDto,
  ): Promise<CreateAppointmentResponseDto> {
    // Ensure the date is a proper Date object
    request.scheduledAt = new Date(request.scheduledAt);
    return await this.createAppointmentUseCase.execute(request);
  }
}
