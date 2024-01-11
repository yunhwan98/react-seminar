import axios from 'axios';
import cheerio, { Element } from 'cheerio';
import { v4 as uuidv4 } from 'uuid';

const getHTML = async (keyword: string, site: string) => {
	//axios.defaults.withCredentials = true;
	try {
		if (site === 'inflearn') {
			return await axios.get('/inflearn/courses?s=' + keyword);
		} else if (site === 'nomad') {
			return await axios.get(`/nomad/courses`);
		} else if (site === 'top') {
			return await axios.get(`/inflearn/tag-curation/common_tag/business-top-50`);
		}
	} catch (err) {
		console.log(err);
	}
};

export const parsing = async (keyword: string, site: string) => {
	const html = await getHTML(keyword, site);

	let courses = [] as any[];

	if (site === 'inflearn') {
		const $ = cheerio.load(html!.data);
		const $courseList = $('.course_card_item');

		$courseList.each((idx, node) => {
			courses.push({
				id: uuidv4(),
				title: $(node).find('.course_title:eq(0)').text(),
				instructor: $(node).find('.instructor').text(),
				price: $(node).find('.price').text(),
				rating: $(node).find('.star_solid').css('width') || '0%',
				img: $(node).find('.card-image > figure > img').attr('src'),
			});
		});
		//console.log(courses);
	} else if (site === 'nomad') {
		const $ = cheerio.load(html!.data);
		const $courseList = $('.sc-ceea8847-0');

		const getUrl = (str: string) => {
			let start = str.indexOf('srcSet=') + 8;
			let end = str.indexOf('g&') + 2;
			let url = str.slice(start, end) + 'w=640&q=75';
			return url;
		};
		$courseList.each((idx, node) => {
			courses.push({
				id: uuidv4(),
				title: $(node).find('h3').text(),
				content: $(node).find('h4').text(),
				img: 'https://nomadcoders.co' + getUrl('' + $(node).find('noscript')),
				instructor: '노마드코더',
			});
			getUrl('' + $(node).find('noscript'));
		});
	} else if (site === 'top') {
		const $ = cheerio.load(html!.data);
		const $courseList = $('.course-card-wrapper');

		//console.log($courseList);
		$courseList.each((idx, node) => {
			courses.push({
				id: uuidv4(),
				title: $(node).find('.course-card__title:eq(0)').text(),
				instructor: $(node).find('.course-card__instructor').text(),
				price: $(node).find('.course-card__price > dd').text(),
				rating: $(node).find('.course-card__star > dd > span').text().slice(0, 3) || '0%',
				img: $(node).find('img').attr('src'),
			});
		});
	}
	return courses;
};
