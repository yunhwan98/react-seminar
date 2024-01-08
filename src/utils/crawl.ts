import axios from 'axios';
import cheerio, { Element } from 'cheerio';

const getHTML = async (keyword: string, site: string) => {
	//axios.defaults.withCredentials = true;
	try {
		if (site === 'inflearn') {
			return await axios.get('/inflearn/courses?s=' + keyword);
		} else if (site === 'fastcampus') {
			//return await axios.get('/fastcampus');
			//return await axios.get('/fastcampus/search?keyword=' + keyword);
			return await axios.get('https://fastcampus.co.kr/search?keyword=' + keyword);
		} else if (site === 'codeit') {
			return await axios.get(`/codeit/search?q=${keyword}&filter=path`);
			//return await axios.get(`/codeit`);
		} else if (site === 'nomad') {
			return await axios.get(`/nomad/courses`);
		} else if (site === 'goorm') {
			return await axios.get(`/goorm/search?subject=` + keyword);
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
				title: $(node).find('.course_title').text(),
				instructor: $(node).find('.instructor').text(),
				price: $(node).find('.price').text(),
				rating: $(node).find('.star_solid').css('width'),
				img: $(node).find('.card-image > figure > img').attr('src'),
			});
		});
	} else if (site === 'fastcampus') {
		const $ = cheerio.load(html!.data);
		const $courseList = $('.footer__link-list-divider');
		//const $courseList = $('.card__container');
	} else if (site === 'codeit') {
		const $ = cheerio.load(html!.data);
		const $courseList = $('.CommonExploreItem_container__cVwD4');
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
				title: $(node).find('h3').text(),
				content: $(node).find('h4').text(),
				img: 'https://nomadcoders.co' + getUrl('' + $(node).find('noscript')),
			});
			getUrl('' + $(node).find('noscript'));
		});
	} else if (site === 'goorm') {
		const $ = cheerio.load(html!.data);
		// const $courseList = $('.sc-ceea8847-0');
		// $courseList.each((idx, node) => {
		// 	courses.push({
		// 		title: $(node).find('h3').text(),
		// 		content: $(node).find('h4').text(),
		// 		img: '/nomad/' + $(node).find('.xx > span > img').attr('src'),
		// 	});
		// });
		// console.log(courses);
	}

	return courses;
};
