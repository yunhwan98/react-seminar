import axios from 'axios';
import cheerio, { Element } from 'cheerio';

const getHTML = async (keyword: string) => {
	try {
		return await axios.get('https://www.inflearn.com.courses?s=' + keyword);
	} catch (err) {
		console.log(err);
	}
};

export const parsing = async (keyword: string) => {
	const html = await getHTML(keyword);

	console.log(html);
	//const $ = cheerio.load(html!.data);
	//const $courseList = $('.course_card_item');
};

parsing('react');
