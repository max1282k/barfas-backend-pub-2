import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose'; // Import Schema for ObjectId reference

export type SensorDocument = Sensor & Document;

@Schema({ timestamps: true })
export class Sensor {
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

  // Update facilityId to be an ObjectId reference to the Facility model
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Facility', required: true })
  Facility: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  Min: number;

  @Prop({ required: true })
  Max: number;
}

export const SensorSchema = SchemaFactory.createForClass(Sensor);
