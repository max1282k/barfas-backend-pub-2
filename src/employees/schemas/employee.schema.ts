import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type EmployeeDocument = Employee & Document;

@Schema({ timestamps: true })
export class Employee {
    @Prop({ required: true })
    Name: string;

    @Prop({ required: true })
    Designation: string;

    @Prop({
        type: {
            x: { type: Number, required: true },
            y: { type: Number, required: true },
            locType: { type: String, enum: ['LOCAL', 'REMOTE'], required: true },
        },
        required: true,
    })
    Location: {
        x: number;
        y: number;
        locType: string;
    };

   // Update facilityId to be an ObjectId reference to the Facility model
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Facility', required: true })
  Facility: MongooseSchema.Types.ObjectId;

    @Prop({ required: true })
    Dob: Date;

    @Prop({ required: true })
    Gender: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
