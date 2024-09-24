import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sheet, SheetDocument } from './schemas/sheet.schema';
import { CreateSheetDto } from './dto/create-sheet.dto';
import { UpdateSheetDto } from './dto/update-sheet.dto';

@Injectable()
export class SheetsService {
    constructor(
        @InjectModel(Sheet.name) private sheetModel: Model<SheetDocument>,
    ) { }

    // Create a new sheet
    async create(createSheetDto: CreateSheetDto): Promise<Sheet> {
        const newSheet = new this.sheetModel(createSheetDto);
        return newSheet.save();
    }

    // Find all sheets with pagination
    async findAll(limit: number, offset: number): Promise<{ data: any[]; totalCount: number }> {
        const totalCount = await this.sheetModel.countDocuments().exec();
        const sheets = await this.sheetModel
            .find()
            .skip(offset)
            .limit(limit)
            .exec();
        return { data: sheets, totalCount };
    }

    // Find sheet by ID
    async findById(id: string): Promise<any> {
        const sheet = await this.sheetModel.findById(id).exec();
        if (!sheet) {
            throw new NotFoundException(`Sheet with id ${id} not found`);
        }
        return sheet;
    }

    // Update a sheet by ID
    async update(id: string, updateSheetDto: UpdateSheetDto): Promise<any> {
        const updatedSheet = await this.sheetModel.findByIdAndUpdate(id, updateSheetDto, { new: true }).exec();
        if (!updatedSheet) {
            throw new NotFoundException(`Sheet with id ${id} not found`);
        }
        return updatedSheet;
    }

    // Delete a sheet by ID
    async delete(id: string): Promise<any> {
        const result = await this.sheetModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Sheet with id ${id} not found`);
        }
        return result;
    }
}
