import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FacilitiesModule } from './facilities/facilities.module';
import { SensorsModule } from './sensors/sensors.module';
import { EmployeesModule } from './employees/employees.module';
import { SensorValuesModule } from './sensorValues/sensor-values.module';
import { DevicesModule } from './devices/devices.module';
import { CamerasModule } from './cameras/cameras.module';
import { SheetsModule } from './sheets/sheets.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    FacilitiesModule,
    SensorsModule,
    EmployeesModule,
    SensorValuesModule,
    DevicesModule,
    CamerasModule,
    SheetsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
