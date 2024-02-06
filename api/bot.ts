import { Bot, GrammyError, HttpError } from 'grammy';
import { run } from '@grammyjs/runner';
import { limit } from '@grammyjs/ratelimiter';
import { autoRetry } from '@grammyjs/auto-retry';
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

process.once("SIGINT", () => bot.stop());
process.once("SIGTERM", () => bot.stop());

run(bot);
bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    const e = err.error;
    if (e instanceof GrammyError) {
        console.error("Error in request:", e.description);
    } else if (e instanceof HttpError) {
        console.error("Could not contact Telegram:", e);
    } else {
        console.error("Unknown error:", e);
    }
});
// export default webhookCallback(bot, 'https');