import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FacilitiesModule } from './facilities/facilities.module';
import { SensorsModule } from './sensors/sensors.module';
import { EmployeesModule } from './employees/employees.module';
import { SensorValuesModule } from './sensorValues/sensor-values.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    FacilitiesModule,
    SensorsModule,
    EmployeesModule,
    SensorValuesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
