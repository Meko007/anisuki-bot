import { Composer } from 'grammy';

const composer = new Composer();

composer.command(['start', 'help'], (ctx) => {
	ctx.reply(`Hello!  Welcome to AnisukiBot.
    \n<b>Commands</b>
    
    /random_quote : Get a random quote from a random anime character
    /anime_airing : Displays anime airing today
    /animanga_news : Get the latest in animanga news`, {
		parse_mode: 'HTML',
	});
});

export default composer;