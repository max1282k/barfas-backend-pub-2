import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee, EmployeeDocument } from './schemas/employee.schema';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
  ) { }

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const newEmployee = new this.employeeModel(createEmployeeDto);
    return newEmployee.save();
  }

  async findAll(limit: number, offset: number): Promise<{ data: any[]; totalCount: number }> {
    const totalCount = await this.employeeModel.countDocuments().exec();

    const employees = await this.employeeModel
      .find()
      .skip(offset)
      .limit(limit)
      .populate('Facility')
      .exec();

    return { data: employees, totalCount };
  }

  async findById(id: string): Promise<any> {
    const employee = await this.employeeModel.findById(id).populate('Facility').exec();
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    const updatedEmployee = await this.employeeModel
      .findByIdAndUpdate(id, updateEmployeeDto, { new: true })
      .exec();
    if (!updatedEmployee) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }
    return updatedEmployee;
  }

  async delete(id: string): Promise<any> {
    const result = await this.employeeModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }
    return result;
  }
}
