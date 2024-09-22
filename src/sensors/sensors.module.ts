import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SensorsController } from './sensors.controller';
import { SensorsService } from './sensors.service';
import { Sensor, SensorSchema } from './schemas/sensor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sensor.name, schema: SensorSchema }]),
  ],
  controllers: [SensorsController],
  providers: [SensorsService],
})
export class SensorsModule { }
