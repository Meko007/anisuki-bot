# AnisukiBot

A telegram bot that displays airing anime, animanga news and random anime quotes, thanks to 
[AnimeSchedule.net's API](https://animeschedule.net/api/v3/documentation), [Animechan's Quotes API](https://animechan.xyz/) and the Anime News Network website. The bot is written in TypeScript using the `grammY` framework.

## Prerequisites

- Node.js and npm
- Your bot token from the BotFather on telegram [BotFather](https://t.me/BotFather)
- Your API token for the AnimeSchedule.net API [AnimeSchedule API Docs](https://animeschedule.net/api/v3/documentation)

## Installation

1. Clone the repo:
```
git clone https://github.com/Meko007/anisuki-bot.git
```
2. Fire up your code editor and head over to the bot's directory
3. Rum `npm install`
4. Set up your `.env` file following the [sample file](./.env.sample)

## Usage

To run the bot, run `npm run build`, then `npm start` in your terminal.

## Commands

- `/anime_airing`: Displays anime airing on the day
- `/random_quote`: Displays a random quote from a random anime character
- `/animanga_news`: Displays latest anime and manga news

## More about grammY

grammY is a framework for creating Telegram bots. It can be used from TypeScript and JavaScript and runs on Node.js, Deno, and in the browser. You can read more [here](https://grammy.dev/)