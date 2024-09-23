import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Device, DeviceDocument } from './schemas/device.schema';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@Injectable()
export class DevicesService {
    constructor(
        @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
    ) { }

    async create(createDeviceDto: CreateDeviceDto): Promise<Device> {
        const newDevice = new this.deviceModel(createDeviceDto);
        return newDevice.save();
    }

    async findAll(limit: number, offset: number): Promise<{ data: any[]; totalCount: number }> {
        const totalCount = await this.deviceModel.countDocuments().exec();
        const devices = await this.deviceModel
            .find()
            .skip(offset)
            .limit(limit)
            .populate('Facility') // Ensure it populates the Facility ObjectId reference
            .exec();
        return { data: devices, totalCount };
    }

    async findById(id: string): Promise<any> {
        const device = await this.deviceModel.findById(id).populate('Facility').exec();
        if (!device) {
            throw new NotFoundException(`Device with id ${id} not found`);
        }
        return device;
    }

    async update(id: string, updateDeviceDto: UpdateDeviceDto): Promise<any> {
        const updatedDevice = await this.deviceModel.findByIdAndUpdate(id, updateDeviceDto, { new: true }).exec();
        if (!updatedDevice) {
            throw new NotFoundException(`Device with id ${id} not found`);
        }
        return updatedDevice;
    }

    async delete(id: string): Promise<any> {
        const result = await this.deviceModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Device with id ${id} not found`);
        }
        return result;
    }
}
