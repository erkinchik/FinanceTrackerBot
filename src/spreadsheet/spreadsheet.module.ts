import { Module } from '@nestjs/common';
import { SpreadsheetService } from './spreadsheet.service';
import { SpreadsheetController } from './spreadsheet.controller';

@Module({
  providers: [SpreadsheetService],
  controllers: [SpreadsheetController],
})
export class SpreadsheetModule {}
