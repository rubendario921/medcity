import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UsersController } from './presentation/controllers/users.controller';
import { UsersApplicationService } from './application/services/users.application.service';
import {
  CreateUserUseCase,
  GetUserUseCase,
  ListUsersUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
} from './domain/use-cases';
import { USER_REPOSITORY_TOKEN } from './domain/repositories/user.repository.interface';
import { UserHttpAdapter } from './infrastructure/adapters/user-http.adapter';

/**
 * UsersModule
 * Módulo que encapsula toda la funcionalidad de usuarios
 * Sigue los principios de Arquitectura Hexagonal y Limpia
 */
@Module({
  imports: [HttpModule],
  controllers: [UsersController],
  providers: [
    // Use Cases
    CreateUserUseCase,
    GetUserUseCase,
    ListUsersUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,

    // Application Service
    UsersApplicationService,

    // Infrastructure - Repository Implementation
    // Cambia este provider según tus necesidades:
    // - Usa UserHttpAdapter para consumir una API REST externa
    // - Usa UserRepository para usar una implementación en memoria
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: UserHttpAdapter,
    },
  ],
  exports: [UsersApplicationService],
})
export class UsersModule {}
