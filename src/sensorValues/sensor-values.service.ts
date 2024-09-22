import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SensorValue, SensorValueDocument } from './schemas/sensor-value.schema';
import { CreateSensorValueDto } from './dto/create-sensor-value.dto';
import { UpdateSensorValueDto } from './dto/update-sensor-value.dto';

@Injectable()
export class SensorValuesService {
  constructor(
    @InjectModel(SensorValue.name) private sensorValueModel: Model<SensorValueDocument>,
  ) { }

  async create(createSensorValueDto: CreateSensorValueDto): Promise<SensorValue> {

    const newSensorValue = new this.sensorValueModel(createSensorValueDto);
    return newSensorValue.save();
  }

  async findAll(limit: number, offset: number): Promise<{ total: number; sensorValues: any[] }> {
    // Get total count of sensor values
    const total = await this.sensorValueModel.countDocuments().exec();

    // Retrieve sensor values with pagination
    const sensorValues = await this.sensorValueModel
      .find()
      .skip(offset)
      .limit(limit)
      .populate('Sensor')
      .populate({
        path: 'Sensor',
        populate: { path: 'Facility' }  // Populate Facility within Sensor
      })
      .exec();

    return {
      total,
      sensorValues,
    };
  }

  async findById(id: string): Promise<any> {
    const sensorValue = await this.sensorValueModel.findById(id).populate({
      path: 'Sensor',
      populate: { path: 'Facility' }  // Populate Facility within Sensor
    }).exec();
    if (!sensorValue) {
      throw new NotFoundException(`Sensor Value with id ${id} not found`);
    }

    return sensorValue;
  }

  async update(id: string, updateSensorValueDto: UpdateSensorValueDto): Promise<SensorValue> {
    const updatedSensorValue = await this.sensorValueModel.findByIdAndUpdate(id, updateSensorValueDto, { new: true }).exec();
    if (!updatedSensorValue) {
      throw new NotFoundException(`Sensor value with id ${id} not found`);
    }
    return updatedSensorValue;
  }

  async delete(id: string): Promise<any> {
    const result = await this.sensorValueModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Sensor value with id ${id} not found`);
    }
    return result;
  }
}
