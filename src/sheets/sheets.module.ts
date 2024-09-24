import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SheetsController } from './sheets.controller';
import { SheetsService } from './sheets.service';
import { Sheet, SheetSchema } from './schemas/sheet.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sheet.name, schema: SheetSchema }]),
  ],
  controllers: [SheetsController],
  providers: [SheetsService],
})
export class SheetsModule {}
