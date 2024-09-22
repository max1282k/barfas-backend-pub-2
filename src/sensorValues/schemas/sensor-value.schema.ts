import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type SensorValueDocument = SensorValue & Document;

@Schema({ timestamps: true })
export class SensorValue {

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Sensor', required: true })
  Sensor: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  Value: number;
}

export const SensorValueSchema = SchemaFactory.createForClass(SensorValue);
