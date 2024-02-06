import { Composer } from 'grammy';

const composer = new Composer();

composer.command('random_quote', async (ctx) => {
	try {
		const response = await fetch('https://animechan.xyz/api/random');
		if (!response.ok) {
			await ctx.reply('<b><i>quotes are unavailabe at the moment</i></b>', { parse_mode: 'HTML' });
			// await ctx.deleteMessage().catch(()=>{});
			return;
			// throw new Error(`Failed to fetch random quote. Status: ${response.status}`);
		}
    
		const randQ = await response.json();
    
		await ctx.reply(
			`
                    "<b><i>${randQ.quote}</i></b>"
                    - ${randQ.character} <i>from</i> ${randQ.anime}
                `, { parse_mode: 'HTML'}
		);
    
		// await ctx.deleteMessage().catch(()=>{});
	} catch (error) {
		console.error(error);
	}
});

export default composer;