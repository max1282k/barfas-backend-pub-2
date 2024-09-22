import { PartialType } from '@nestjs/mapped-types';
import { CreateSensorValueDto } from './create-sensor-value.dto';

export class UpdateSensorValueDto extends PartialType(CreateSensorValueDto) {}
