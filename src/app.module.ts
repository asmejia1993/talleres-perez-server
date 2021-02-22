import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { CarModule } from './car/car.module';
import { DiagnosticModule } from './diagnostic/diagnostic.module';
import { ConfigModule } from '@nestjs/config';
import { config } from './config/config';
import { DatabaseConfig } from './config/database.config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
     }),
    CustomerModule,
    CarModule,
    DiagnosticModule],
  controllers: [AppController,],
  providers: [AppService], 
})
export class AppModule {}
