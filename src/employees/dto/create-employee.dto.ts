import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty({ description: 'The name of the employee' })
  readonly Name: string;

  @ApiProperty({ description: 'The designation of the employee' })
  readonly Designation: string;

  @ApiProperty({ description: 'The location of the employee', type: Object })
  readonly Location: {
    x: number;
    y: number;
    locType: string;
  };

  @ApiProperty({ description: 'The facility ID associated with the employee' })
  readonly Facility: string;

  @ApiProperty({ description: 'The date of birth of the employee' })
  readonly Dob: Date;

  @ApiProperty({ description: 'The gender of the employee' })
  readonly Gender: string;
}
