import { Module } from '@nestjs/common';
import { TelegramUpdate } from './telegram.update';
import { TelegrafModule } from 'nestjs-telegraf';
import { options } from '../configs/telegram.config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../models/user.model';
@Module({
  imports: [
    TelegrafModule.forRootAsync(options()),
    MongooseModule.forFeature([{ name: 'users', schema: UserSchema }]),
  ],
  controllers: [],
  providers: [TelegramUpdate],
})
export class TelegramModule {}
