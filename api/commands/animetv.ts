import { Composer, InlineKeyboard } from 'grammy';
import { fetchTimeTable } from '../helpers/schedule';

const composer = new Composer();

interface Streaming {
	[key: string]: string | undefined;
}

composer.command('anime_airing', async (ctx) => {
	try {
		const animeData = await fetchTimeTable();
		const pictureURL = 'https://img.animeschedule.net/production/assets/public/img/';
		const targetDay = new Date().toLocaleDateString().replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1');

		const getStream = (streams: Streaming): string | undefined => {
			for (const key in streams) {
				if (streams[key]) {
					return streams[key];
				}
			}
		};


		if (animeData) {
			const animeToday = animeData.filter((anime: { episodeDate: string }) => anime.episodeDate.split('T')[0] === targetDay);
			for (let i = 0; i < animeToday.length; i++) {
				const imgURL = pictureURL + animeToday[i].imageVersionRoute;
				const plainTime = new Date(animeToday[i].episodeDate);
				const localTime = plainTime.toLocaleDateString([], { hour: '2-digit', minute: '2-digit', hour12: false });

				const streamURL: string | undefined = getStream(animeToday[i].streams);

				const keyboard = new InlineKeyboard().url('STREAM', `${streamURL}`);


				await ctx.replyWithPhoto(imgURL, {
    
					caption:    `<b>Title: ${animeToday[i].title}</b>
                                    \nEnglish title: ${animeToday[i].english || animeToday[i].title}
                                    \nKanji title: ${animeToday[i].native || ''}
                                    \nEpisode: ${animeToday[i].episodeNumber} of ${animeToday[i].episodes || '?'}
                                    \nTime: <b>${localTime}</b>
                                    \nAiring Status: <b>${animeToday[i].airingStatus}</b>
                                    `,
					parse_mode: 'HTML',
					reply_markup: keyboard,
				});
			}
		}
            
	} catch (error) {
		console.error(error);
		throw new Error (`Failed to produce the schedule. ${error}`);
	}
});

export default composer;