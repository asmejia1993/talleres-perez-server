import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'taller_perez_db',
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    CustomerModule],
  controllers: [AppController],
  providers: [AppService], 
})
export class AppModule {}
