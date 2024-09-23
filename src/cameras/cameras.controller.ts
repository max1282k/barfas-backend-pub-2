import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CamerasService } from './cameras.service';
import { CreateCameraDto } from './dto/create-camera.dto';
import { UpdateCameraDto } from './dto/update-camera.dto';
import { Camera } from './schemas/camera.schema';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('cameras')
@Controller('cameras')
export class CamerasController {
  constructor(private readonly camerasService: CamerasService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new camera' })
  @ApiResponse({ status: 201, description: 'The camera has been successfully created.', type: Camera })
  async create(@Body() createCameraDto: CreateCameraDto): Promise<Camera> {
    return this.camerasService.create(createCameraDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cameras' })
  @ApiResponse({ status: 200, description: 'Return all cameras', type: [Camera] })
  async findAll(
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0
  ): Promise<{ data: any[]; totalCount: number }> {
    return this.camerasService.findAll(Number(limit), Number(offset));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a camera by ID' })
  @ApiResponse({ status: 200, description: 'Return the camera with the given ID', type: Camera })
  @ApiResponse({ status: 404, description: 'Camera not found' })
  async findById(@Param('id') id: string): Promise<Camera> {
    return this.camerasService.findById(id);
  }

  @Post('update/:id')
  @ApiOperation({ summary: 'Update a camera by ID' })
  @ApiResponse({ status: 200, description: 'The camera has been successfully updated', type: Camera })
  @ApiResponse({ status: 404, description: 'Camera not found' })
  async update(@Param('id') id: string, @Body() updateCameraDto: UpdateCameraDto): Promise<Camera> {
    return this.camerasService.update(id, updateCameraDto);
  }

  @Post('delete/:id')
  @ApiOperation({ summary: 'Delete a camera by ID' })
  @ApiResponse({ status: 200, description: 'The camera has been successfully deleted' })
  @ApiResponse({ status: 404, description: 'Camera not found' })
  async delete(@Param('id') id: string): Promise<any> {
    return this.camerasService.delete(id);
  }
}
