import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import googleConfig from '../configs/spreadsheet.config';
import { sheets_v4, google, Auth } from 'googleapis';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class SpreadsheetService {
  private sheets: sheets_v4.Sheets;
  private client: Auth.GoogleAuth;
  constructor(
    @Inject(googleConfig.KEY)
    private readonly configService: ConfigType<typeof googleConfig>,
  ) {
    this.auth();
  }
  private auth() {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        private_key: this.configService.google.privateKey,
        client_email: this.configService.google.clientEmail,
      },
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive',
      ],
    });
    const sheets = google.sheets({ version: 'v4', auth });
    this.sheets = sheets;
    this.client = auth;
  }

  async create(): Promise<{ sheet_link: string }> {
    try {
      const newSpreadSheet = await this.sheets.spreadsheets.create({
        requestBody: { properties: { title: 'TEST' } },
        fields: 'spreadsheetId',
      });

      return {
        sheet_link: `https://docs.google.com/spreadsheets/d/${newSpreadSheet.data.spreadsheetId}`,
      };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async giveAnAccess(
    spreadSheetId: string,
    email: string,
  ): Promise<{ status: string }> {
    try {
      const drive = google.drive({ version: 'v3', auth: this.client });
      const res = await drive.permissions.create({
        requestBody: {
          type: 'user',
          role: 'writer',
          emailAddress: email,
        },
        fileId: spreadSheetId,
      });

      return { status: 'Permitted!' };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
