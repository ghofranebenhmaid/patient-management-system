import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PatientsModule } from './patients/patients.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USERNAME || 'ghofranebenhmaid', // Default to your macOS username
      password: process.env.DB_PASSWORD || '', // No password by default on macOS
      database: 'patient_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Use only for development, not in production
    }),
    AuthModule,
    UsersModule,
    PatientsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
