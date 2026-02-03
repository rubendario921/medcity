import { Module } from '@nestjs/common';
import { UsersController } from './presentation/controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { TypeOrmUserEntity } from './infrastructure/persistence/typeorm-user.entity';
import { TypeOrmUserRepository } from './infrastructure/adapters/user.adapters';
import { UserMappers } from './infrastructure/mappers/user.mappers';
import {
  CreateUserUseCase,
  DeleteUserUseCase,
  GetAllUserUseCase,
  GetUserUseCase,
  UpdateUserUseCase,
} from './application/use-cases';
@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmUserEntity])],
  controllers: [UsersController],
  providers: [
    UserMappers,
    TypeOrmUserRepository,
    { provide: 'IUserRepository', useClass: TypeOrmUserRepository },
    CreateUserUseCase,
    DeleteUserUseCase,
    GetAllUserUseCase,
    GetUserUseCase,
    UpdateUserUseCase,
  ],
})
export class UsersModule {}
