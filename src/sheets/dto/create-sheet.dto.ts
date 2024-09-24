import { ApiProperty } from '@nestjs/swagger';

export class CreateSheetDto {
  @ApiProperty({ description: 'The name of the sheet', example: 'My_sheet' })
  readonly sheetName: string;

  @ApiProperty({
    description: '2D array representing the sheet data',
    example: [
      ["sss", null, null, null, null, null, null, null],
      ["sdsd", null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null]
    ],
    type: [[String, 'null']],
  })
  readonly sheetData: (string | null)[][];
}
