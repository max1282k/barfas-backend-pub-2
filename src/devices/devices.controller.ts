import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device } from './schemas/device.schema';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('devices')
@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new device' })
  @ApiResponse({ status: 201, description: 'The device has been successfully created.', type: Device })
  async create(@Body() createDeviceDto: CreateDeviceDto): Promise<Device> {
    return this.devicesService.create(createDeviceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all devices' })
  @ApiResponse({ status: 200, description: 'Return all devices', type: [Device] })
  async findAll(
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0
  ): Promise<{ data: any[]; totalCount: number }> {
    return this.devicesService.findAll(Number(limit), Number(offset));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a device by ID' })
  @ApiResponse({ status: 200, description: 'Return the device with the given ID', type: Device })
  @ApiResponse({ status: 404, description: 'Device not found' })
  async findById(@Param('id') id: string): Promise<Device> {
    return this.devicesService.findById(id);
  }

  @Post('update/:id')
  @ApiOperation({ summary: 'Update a device by ID' })
  @ApiResponse({ status: 200, description: 'The device has been successfully updated', type: Device })
  @ApiResponse({ status: 404, description: 'Device not found' })
  async update(@Param('id') id: string, @Body() updateDeviceDto: UpdateDeviceDto): Promise<Device> {
    return this.devicesService.update(id, updateDeviceDto);
  }

  @Post('delete/:id')
  @ApiOperation({ summary: 'Delete a device by ID' })
  @ApiResponse({ status: 200, description: 'The device has been successfully deleted' })
  @ApiResponse({ status: 404, description: 'Device not found' })
  async delete(@Param('id') id: string): Promise<any> {
    return this.devicesService.delete(id);
  }
}
