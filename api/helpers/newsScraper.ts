import axios from 'axios';
import cheerio from 'cheerio';

const data: { title: string, news: string, link: string }[] = [];

const scrape = async () => {
	try {
		const response = await axios.get('https://www.animenewsnetwork.com/news/');
		const $ = cheerio.load(response.data);
		
		$('.herald.box.news').each( (i, el) => {
			const title = $(el).find('.wrap h3').text();
			const news = $(el).find('.full').text();
			const link = String($(el).find('.wrap a').attr('href'));
	
			data.push({ title, news, link });
		});	
	} catch (error) {
		console.error(error);
	}
};
scrape();

export default data;