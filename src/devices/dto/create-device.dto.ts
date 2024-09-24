import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose'; // Import Types for ObjectId reference

export class CreateDeviceDto {
  @ApiProperty({ description: 'The name of the device' })
  readonly Name: string;

  @ApiProperty({ description: 'The location of the device', type: Object })
  readonly Location: {
    x: number;
    y: number;
  };

  @ApiProperty({ description: 'The ID of the facility where the device is located', type: String })
  readonly Facility: Types.ObjectId;

  @ApiProperty({ description: 'The type of device' })
  readonly DeviceType: string;

  @ApiProperty({ description: 'The current status of the device' })
  readonly Status: string;

  @ApiProperty({ description: 'The current value measured by the device' })
  readonly Value: number;

  @ApiProperty({ description: 'The unit of the measured value' })
  readonly Unit: string;
}
