import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { CarModule } from './car/car.module';
import { DiagnosticModule } from './diagnostic/diagnostic.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      //shost: 'mysql',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'taller_perez_db',
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    CustomerModule,
    CarModule,
    DiagnosticModule],
  controllers: [AppController,],
  providers: [AppService], 
})
export class AppModule {}
