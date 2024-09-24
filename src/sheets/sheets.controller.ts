import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { SheetsService } from './sheets.service';
import { CreateSheetDto } from './dto/create-sheet.dto';
import { UpdateSheetDto } from './dto/update-sheet.dto';
import { Sheet } from './schemas/sheet.schema';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('sheets')
@Controller('sheets')
export class SheetsController {
  constructor(private readonly sheetsService: SheetsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new sheet' })
  @ApiResponse({ status: 201, description: 'The sheet has been successfully created.', type: Sheet })
  async create(@Body() createSheetDto: CreateSheetDto): Promise<Sheet> {
    return this.sheetsService.create(createSheetDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all sheets' })
  @ApiResponse({ status: 200, description: 'Return all sheets', type: [Sheet] })
  async findAll(
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0
  ): Promise<{ data: any[]; totalCount: number }> {
    return this.sheetsService.findAll(Number(limit), Number(offset));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a sheet by ID' })
  @ApiResponse({ status: 200, description: 'Return the sheet with the given ID', type: Sheet })
  @ApiResponse({ status: 404, description: 'Sheet not found' })
  async findById(@Param('id') id: string): Promise<Sheet> {
    return this.sheetsService.findById(id);
  }

  @Post('update/:id')
  @ApiOperation({ summary: 'Update a sheet by ID' })
  @ApiResponse({ status: 200, description: 'The sheet has been successfully updated', type: Sheet })
  @ApiResponse({ status: 404, description: 'Sheet not found' })
  async update(@Param('id') id: string, @Body() updateSheetDto: UpdateSheetDto): Promise<Sheet> {
    return this.sheetsService.update(id, updateSheetDto);
  }

  @Post('delete/:id')
  @ApiOperation({ summary: 'Delete a sheet by ID' })
  @ApiResponse({ status: 200, description: 'The sheet has been successfully deleted' })
  @ApiResponse({ status: 404, description: 'Sheet not found' })
  async delete(@Param('id') id: string): Promise<any> {
    return this.sheetsService.delete(id);
  }
}
