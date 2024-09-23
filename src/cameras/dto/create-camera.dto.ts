import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateCameraDto {
  @ApiProperty({ description: 'The name of the camera' })
  readonly Name: string;

  @ApiProperty({ description: 'The facility ID the camera is located at', type: String })
  readonly Facility: Types.ObjectId;

  @ApiProperty({ description: 'The location of the camera', type: Object })
  readonly Location: {
    x: number;
    y: number;
  };

  @ApiProperty({ description: 'The current status of the camera' })
  readonly Status: string;

  @ApiProperty({ description: 'The URL for accessing the camera feed' })
  readonly Url: string;
}
