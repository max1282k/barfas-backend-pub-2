import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type CameraDocument = Camera & Document;

@Schema({ timestamps: true })
export class Camera {
  @Prop({ required: true })
  Name: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Facility', required: true })
  Facility: MongooseSchema.Types.ObjectId;

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

  @Prop({ required: true })
  Status: string;

  @Prop({ required: true })
  Url: string;
}

export const CameraSchema = SchemaFactory.createForClass(Camera);
