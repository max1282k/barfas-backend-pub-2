import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Facility, FacilityDocument } from './schemas/facility.schema';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';

@Injectable()
export class FacilitiesService {
  constructor(@InjectModel(Facility.name) private facilityModel: Model<FacilityDocument>) { }

  async create(createFacilityDto: CreateFacilityDto): Promise<Facility> {
    const newFacility = new this.facilityModel(createFacilityDto);
    return newFacility.save();
  }

  async findAll(limit: number, offset: number): Promise<{ data: Facility[]; totalCount: number }> {
    const totalCount = await this.facilityModel.countDocuments().exec();
    const data = await this.facilityModel
      .find()
      .skip(offset)
      .limit(limit)
      .exec();
    return { data, totalCount };
  }

  async findById(id: string): Promise<Facility> {
    const facility = await this.facilityModel.findById(id).exec();
    if (!facility) {
      throw new NotFoundException(`Facility with id ${id} not found`);
    }
    return facility;
  }

  async update(id: string, updateFacilityDto: UpdateFacilityDto): Promise<Facility> {
    const updatedFacility = await this.facilityModel.findByIdAndUpdate(id, updateFacilityDto, { new: true }).exec();
    if (!updatedFacility) {
      throw new NotFoundException(`Facility with id ${id} not found`);
    }
    return updatedFacility;
  }

  async delete(id: string): Promise<any> {
    const result = await this.facilityModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Facility with id ${id} not found`);
    }
    return result;
  }
}
