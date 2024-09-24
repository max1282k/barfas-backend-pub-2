import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SheetDocument = Sheet & Document;

@Schema({ timestamps: true })
export class Sheet {
    @Prop({ required: true })
    sheetName: string;

    @Prop({ required: true, type: [[{ type: String, default: null }]] })
    sheetData: (string | null)[][];
}

export const SheetSchema = SchemaFactory.createForClass(Sheet);
