import { Bot, webhookCallback } from "grammy";
import { limit } from '@grammyjs/ratelimiter';
import { autoRetry } from "@grammyjs/auto-retry";
import start from './commands/start';
import quotes from './commands/quotes';
import animetv from './commands/animetv';
import news from './commands/news';
import 'dotenv/config';

const token = process.env.BOT_TOKEN as string;
const bot = new Bot(token);

bot.api.setMyCommands([
    {
		command: 'random_quote', 
		description: 'Get a random quote from a random anime character'
	},
	{ command: 'anime_airing', description: 'Displays anime airing today' },
	{
		command: 'animanga_news',
		description: 'Get the latest in animanga news',
	},
]);

bot.use(start, quotes, animetv, news);

const env = process.env.NODE_ENV;

if (env === 'dev') {
    bot.start();
}

bot.use(limit({
    timeFrame: 5000,
    limit: 3,
    onLimitExceeded: ctx => ctx.reply('Too many requests, please try again later.'),
    storageClient: 'MEMORY_STORE',
    keyGenerator: (ctx) => ctx.from && ctx.from.id.toString(),
}));

bot.api.config.use(autoRetry({
    maxRetryAttempts: 1,
    maxDelaySeconds: 5,
}));

export default webhookCallback(bot, "https");
