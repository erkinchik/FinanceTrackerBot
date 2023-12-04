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
export class TelegramUpdate {
  options: TelegramOptions;

  constructor(@InjectBot() private bot: Telegraf<Context>) {}
  @Start()
  async start(@Ctx() ctx: Context) {
    await ctx.reply('Welcome');
  }

  @Help()
  async help(@Ctx() ctx: Context) {
    await ctx.reply('Send me a sticker');
  }

  @On('text')
  async on(@Ctx() ctx: Context) {
    console.log(ctx.from);
    await ctx.reply('ok');
  }

  @Hears('hi')
  async hears(@Ctx() ctx: Context) {
    await ctx.reply('Hey there');
  }
}
