import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { options } from '../configs/telegram.config';

@Module({
  imports: [TelegrafModule.forRootAsync(options())],
  controllers: [],
  providers: [TelegramService],
})
export class TelegramModule {}
