import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Camera, CameraDocument } from './schemas/camera.schema';
import { CreateCameraDto } from './dto/create-camera.dto';
import { UpdateCameraDto } from './dto/update-camera.dto';

@Injectable()
export class CamerasService {
  constructor(
    @InjectModel(Camera.name) private cameraModel: Model<CameraDocument>,
  ) {}

  async create(createCameraDto: CreateCameraDto): Promise<Camera> {
    const newCamera = new this.cameraModel(createCameraDto);
    return newCamera.save();
  }

  async findAll(limit: number, offset: number): Promise<{ data: any[]; totalCount: number }> {
    const totalCount = await this.cameraModel.countDocuments().exec();
    const cameras = await this.cameraModel
      .find()
      .skip(offset)
      .limit(limit)
      .populate('Facility')
      .exec();
    return { data: cameras, totalCount };
  }

  async findById(id: string): Promise<Camera> {
    const camera = await this.cameraModel.findById(id).populate('Facility').exec();
    if (!camera) {
      throw new NotFoundException(`Camera with id ${id} not found`);
    }
    return camera;
  }

  async update(id: string, updateCameraDto: UpdateCameraDto): Promise<Camera> {
    const updatedCamera = await this.cameraModel.findByIdAndUpdate(id, updateCameraDto, { new: true }).exec();
    if (!updatedCamera) {
      throw new NotFoundException(`Camera with id ${id} not found`);
    }
    return updatedCamera;
  }

  async delete(id: string): Promise<any> {
    const result = await this.cameraModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Camera with id ${id} not found`);
    }
    return result;
  }
}
