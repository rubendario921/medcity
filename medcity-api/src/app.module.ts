import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmUserEntity } from './modules/users/infrastructure/persistence/typeorm-user.entity';
import { UsersModule } from './modules/users/users.module';
import { UsersController } from './modules/users/presentation/controllers/users.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
      entities: [TypeOrmUserEntity],
    }),
    UsersModule,
  ],
  controllers: [UsersController],
})
export class AppModule {}
