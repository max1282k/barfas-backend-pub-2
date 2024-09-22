import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SensorValuesController } from './sensor-values.controller';
import { SensorValuesService } from './sensor-values.service';
import { SensorValue, SensorValueSchema } from './schemas/sensor-value.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SensorValue.name, schema: SensorValueSchema }]),
  ],
  controllers: [SensorValuesController],
  providers: [SensorValuesService],
})
export class SensorValuesModule {}
