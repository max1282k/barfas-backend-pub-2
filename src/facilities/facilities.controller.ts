import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { FacilitiesService } from './facilities.service';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';
import { Facility } from './schemas/facility.schema';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('facilities')
@Controller('facilities')
export class FacilitiesController {
  constructor(private readonly facilitiesService: FacilitiesService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new facility' })
  @ApiResponse({ status: 201, description: 'The facility has been successfully created.', type: Facility })
  async create(@Body() createFacilityDto: CreateFacilityDto): Promise<Facility> {
    return this.facilitiesService.create(createFacilityDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all facilities' })
  @ApiResponse({ status: 200, description: 'Return all facilities', type: [Facility] })
  async findAll(
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0
  ): Promise<{ data: Facility[]; totalCount: number }> {
    return this.facilitiesService.findAll(Number(limit), Number(offset));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a facility by ID' })
  @ApiResponse({ status: 200, description: 'Return the facility with the given ID', type: Facility })
  @ApiResponse({ status: 404, description: 'Facility not found' })
  async findById(@Param('id') id: string): Promise<Facility> {
    return this.facilitiesService.findById(id);
  }

  @Post('update/:id')
  @ApiOperation({ summary: 'Update a facility by ID' })
  @ApiResponse({ status: 200, description: 'The facility has been successfully updated', type: Facility })
  @ApiResponse({ status: 404, description: 'Facility not found' })
  async update(@Param('id') id: string, @Body() updateFacilityDto: UpdateFacilityDto): Promise<Facility> {
    return this.facilitiesService.update(id, updateFacilityDto);
  }

  @Post('delete/:id')
  @ApiOperation({ summary: 'Delete a facility by ID' })
  @ApiResponse({ status: 200, description: 'The facility has been successfully deleted' })
  @ApiResponse({ status: 404, description: 'Facility not found' })
  async delete(@Param('id') id: string): Promise<any> {
    return this.facilitiesService.delete(id);
  }
}
