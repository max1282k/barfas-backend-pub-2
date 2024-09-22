import { Controller, Get, Param, Post, Body, Query } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new employee' })
  async create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<any> {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all employees with pagination' })
  async findAll(
    @Query('limit') limit: number = 10, 
    @Query('offset') offset: number = 0
  ): Promise<{ data: any[]; totalCount: number }> {
    return this.employeesService.findAll(Number(limit), Number(offset));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an employee by ID' })
  async findById(@Param('id') id: string): Promise<any> {
    return this.employeesService.findById(id);
  }

  @Post('update/:id')
  @ApiOperation({ summary: 'Update an employee by ID' })
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto
  ): Promise<any> {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Post('delete/:id')
  @ApiOperation({ summary: 'Delete an employee by ID' })
  async delete(@Param('id') id: string): Promise<any> {
    return this.employeesService.delete(id);
  }
}
