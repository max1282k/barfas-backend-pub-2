import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FacilityDocument = Facility & Document;

@Schema({ timestamps: true })  // Enable timestamps
export class Facility {
  @Prop({ required: true })
  Name: string;

  @Prop({
    type: {
      Latitude: { type: Number, required: true },
      Longitude: { type: Number, required: true },
    },
    required: true,
  })
  Location: {
    Latitude: number;
    Longitude: number;
  };

  @Prop({ required: true })
  Floor: number;

  @Prop({ required: true })
  FloorPlanModel: string;

  @Prop({ required: true })
  Capacity: number;

  @Prop({ required: true })
  Type: string;
}

export const FacilitySchema = SchemaFactory.createForClass(Facility);
