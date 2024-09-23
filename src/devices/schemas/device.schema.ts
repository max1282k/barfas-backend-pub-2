import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose'; // Import Schema for ObjectId reference

export type DeviceDocument = Device & Document;

@Schema({ timestamps: true })
export class Device {
    @Prop({ required: true })
    Name: string;

    @Prop({
        type: {
            x: { type: Number, required: true },
            y: { type: Number, required: true },
        },
        required: true,
    })

    Location: {
        x: number;
        y: number;
    };

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Facility', required: true })
    Facility: MongooseSchema.Types.ObjectId;

    @Prop({ required: true })
    Status: string;

    @Prop({ required: true })
    Value: number;

    @Prop({ required: true })
    Unit: string;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
