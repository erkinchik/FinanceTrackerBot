import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegramModule } from './telegram/telegram.module';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from './configs/mongo.config';
import { SpreadsheetModule } from './spreadsheet/spreadsheet.module';
import googleConfig from './configs/spreadsheet.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [googleConfig] }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),
    TelegramModule,
    SpreadsheetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
