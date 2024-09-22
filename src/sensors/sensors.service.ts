import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sensor, SensorDocument } from './schemas/sensor.schema';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';

@Injectable()
export class SensorsService {
    constructor(
        @InjectModel(Sensor.name) private sensorModel: Model<SensorDocument>,
    ) { }

    async create(createSensorDto: CreateSensorDto): Promise<Sensor> {
        const newSensor = new this.sensorModel(createSensorDto);
        return newSensor.save();
    }

    async findAll(limit: number, offset: number): Promise<{ data: any[]; totalCount: number }> {
        const totalCount = await this.sensorModel.countDocuments().exec();
        const sensors = await this.sensorModel
            .find()
            .skip(offset)
            .limit(limit)
            .populate('Facility')
            .exec();
        return { data: sensors, totalCount };
    }

    async findById(id: string): Promise<any> {
        const sensor = await this.sensorModel.findById(id).populate('Facility').exec();
        return sensor;
    }

    async update(id: string, updateSensorDto: UpdateSensorDto): Promise<any> {
        const updatedSensor = await this.sensorModel.findByIdAndUpdate(id, updateSensorDto, { new: true }).exec();
        if (!updatedSensor) {
            throw new NotFoundException(`Sensor with id ${id} not found`);
        }
        return updatedSensor;
    }

    async delete(id: string): Promise<any> {
        const result = await this.sensorModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Sensor with id ${id} not found`);
        }
        return result;
    }
}
