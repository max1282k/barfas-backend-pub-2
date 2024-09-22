import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { SensorValuesService } from './sensor-values.service';
import { CreateSensorValueDto } from './dto/create-sensor-value.dto';
import { UpdateSensorValueDto } from './dto/update-sensor-value.dto';
import { SensorValue } from './schemas/sensor-value.schema';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('sensor-values')
@Controller('sensor-values')
export class SensorValuesController {
  constructor(private readonly sensorValuesService: SensorValuesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new sensor value' })
  @ApiResponse({ status: 201, description: 'The sensor value has been successfully created.' })
  async create(@Body() createSensorValueDto: CreateSensorValueDto): Promise<any> {
    return this.sensorValuesService.create(createSensorValueDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all sensor values with pagination' })
  @ApiResponse({ status: 200, description: 'Return all sensor values' })
  async findAll(
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0
  ): Promise<{ total: number; sensorValues: any[] }> {
    return this.sensorValuesService.findAll(limit, offset);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a sensor value by ID' })
  @ApiResponse({ status: 200, description: 'Return the sensor value with the given ID' })
  @ApiResponse({ status: 404, description: 'Sensor value not found' })
  async findById(@Param('id') id: string): Promise<any> {
    return this.sensorValuesService.findById(id);
  }

  @Post('update/:id')
  @ApiOperation({ summary: 'Update a sensor value by ID' })
  @ApiResponse({ status: 200, description: 'The sensor value has been successfully updated', type: SensorValue })
  @ApiResponse({ status: 404, description: 'Sensor value not found' })
  async update(@Param('id') id: string, @Body() updateSensorValueDto: UpdateSensorValueDto): Promise<SensorValue> {
    return this.sensorValuesService.update(id, updateSensorValueDto);
  }

  @Post('delete/:id')
  @ApiOperation({ summary: 'Delete a sensor value by ID' })
  @ApiResponse({ status: 200, description: 'The sensor value has been successfully deleted' })
  @ApiResponse({ status: 404, description: 'Sensor value not found' })
  async delete(@Param('id') id: string): Promise<any> {
    return this.sensorValuesService.delete(id);
  }
}
