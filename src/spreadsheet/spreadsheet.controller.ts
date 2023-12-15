import { Body, Controller, Param, Post } from '@nestjs/common';
import { SpreadsheetService } from './spreadsheet.service';

@Controller('spreadsheet')
export class SpreadsheetController {
  constructor(private spreadSheetService: SpreadsheetService) {}
  @Post()
  async create(): Promise<{
    message: string;
    sheet_link: string;
  }> {
    const { sheet_link } = await this.spreadSheetService.create();
    return { message: 'sheet successfully was created', sheet_link };
  }

  @Post('/permission/:sheetId')
  async access(
    @Param('sheetId') sheetId,
    @Body() { email },
  ): Promise<{ status: string }> {
    return this.spreadSheetService.giveAnAccess(sheetId, email);
  }
}
