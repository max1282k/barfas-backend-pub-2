import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FacilitiesController } from './facilities.controller';
import { FacilitiesService } from './facilities.service';
import { Facility, FacilitySchema } from './schemas/facility.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Facility.name, schema: FacilitySchema }])],
  controllers: [FacilitiesController],
  providers: [FacilitiesService],
})
export class FacilitiesModule {}
