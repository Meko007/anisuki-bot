import axios from 'axios';
import 'dotenv/config';

const token = process.env.ANIME_SCHEDULE_TOKEN as string;

const year = new Date().getFullYear();

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const fetchTimeTable = async () => {
	try {
		const response = await axios.get(
			`https://animeschedule.net/api/v3/timetables/sub?year=${year}?tz=${timezone}`, {
				headers: {
					Authorization: `Bearer ${token}`
				},
			});
		const data = response.data;
		return data;
	} catch (error) {
		console.error(error);
	}
};