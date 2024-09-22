import { ApiProperty } from '@nestjs/swagger';

export class CreateSensorDto {
  @ApiProperty({ description: 'The name of the sensor' })
  readonly Name: string;

  @ApiProperty({ description: 'The location of the sensor', type: Object })
  readonly Location: {
    x: number;
    y: number;
  };

  @ApiProperty({ description: 'The ID of the facility where the sensor is located' })
  readonly Facility: string;

  @ApiProperty({ description: 'The minimum value the sensor can measure' })
  readonly Min: number;

  @ApiProperty({ description: 'The maximum value the sensor can measure' })
  readonly Max: number;
}
