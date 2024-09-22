import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { Sensor } from './schemas/sensor.schema';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('sensors')
@Controller('sensors')
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new sensor' })
  @ApiResponse({ status: 201, description: 'The sensor has been successfully created.', type: Sensor })
  async create(@Body() createSensorDto: CreateSensorDto): Promise<Sensor> {
    return this.sensorsService.create(createSensorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all sensors' })
  @ApiResponse({ status: 200, description: 'Return all sensors', type: [Sensor] })
  async findAll(
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0
  ): Promise<{ data: any[]; totalCount: number }> {
    return this.sensorsService.findAll(Number(limit), Number(offset));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a sensor by ID' })
  @ApiResponse({ status: 200, description: 'Return the sensor with the given ID', type: Sensor })
  @ApiResponse({ status: 404, description: 'Sensor not found' })
  async findById(@Param('id') id: string): Promise<Sensor> {
    return this.sensorsService.findById(id);
  }

  @Post('update/:id')
  @ApiOperation({ summary: 'Update a sensor by ID' })
  @ApiResponse({ status: 200, description: 'The sensor has been successfully updated', type: Sensor })
  @ApiResponse({ status: 404, description: 'Sensor not found' })
  async update(@Param('id') id: string, @Body() updateSensorDto: UpdateSensorDto): Promise<Sensor> {
    return this.sensorsService.update(id, updateSensorDto);
  }

  @Post('delete/:id')
  @ApiOperation({ summary: 'Delete a sensor by ID' })
  @ApiResponse({ status: 200, description: 'The sensor has been successfully deleted' })
  @ApiResponse({ status: 404, description: 'Sensor not found' })
  async delete(@Param('id') id: string): Promise<any> {
    return this.sensorsService.delete(id);
  }
}
