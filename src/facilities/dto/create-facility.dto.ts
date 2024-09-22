import { ApiProperty } from '@nestjs/swagger';

export class CreateFacilityDto {
  @ApiProperty({ description: 'The name of the facility' })
  readonly Name: string;

  @ApiProperty({ description: 'The location of the facility', type: Object })
  readonly Location: {
    Latitude: number;
    Longitude: number;
  };

  @ApiProperty({ description: 'The floor number of the facility' })
  readonly Floor: number;

  @ApiProperty({ description: 'The floor plan of the facility' })
  readonly FloorPlanModel: string;

  @ApiProperty({ description: 'The capacity of the facility' })
  readonly Capacity: number;

  @ApiProperty({ description: 'The type of the facility' })
  readonly Type: string;
}
