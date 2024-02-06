import { Composer } from 'grammy';
import data from '../helpers/newsScraper';

const composer = new Composer();

composer.command('animanga_news', async (ctx) => {
	try {
		const baseURI = 'https://www.animenewsnetwork.com/';
		for (let i = 0; i < 10; i++) {
			ctx.reply(
				`<b><i>${ data[i].title }</i></b>
                    \n${ data[i].news }
                    \n<a href = "${ baseURI }${ data[i].link }">Read more...</a>
                    `, { parse_mode: 'HTML' }
			);
		}
            
	} catch (error) {
		console.error(error);
		throw new Error (`Attempt to generate the news was unsuccessful. ${error}`);
	}
});

export default composer;