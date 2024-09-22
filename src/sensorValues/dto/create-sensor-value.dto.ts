import { ApiProperty } from '@nestjs/swagger';

export class CreateSensorValueDto {
  @ApiProperty({ description: 'The ID of the sensor' })
  readonly Sensor: string;

  @ApiProperty({ description: 'The value recorded by the sensor' })
  readonly Value: number;
}
