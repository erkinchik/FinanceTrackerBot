import { Context, Telegraf } from 'telegraf';
import {
  Update,
  Ctx,
  Start,
  Help,
  On,
  Hears,
  InjectBot,
} from 'nestjs-telegraf';
import { TelegramOptions } from '../common/interfaces/telegram.interface';

@Update()
export class TelegramService {
  options: TelegramOptions;

  constructor(@InjectBot() private bot: Telegraf<Context>) {}
  @Start()
  async start(@Ctx() ctx: any) {
    await ctx.reply('Welcome');
  }

  @Help()
  async help(@Ctx() ctx: any) {
    await ctx.reply('Send me a sticker');
  }

  @On('sticker')
  async on(@Ctx() ctx: any) {
    await ctx.reply('👍');
  }

  @Hears('hi')
  async hears(@Ctx() ctx: any) {
    await ctx.reply('Hey there');
  }
}
