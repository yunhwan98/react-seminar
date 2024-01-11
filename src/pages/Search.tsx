import React, { useEffect, useState } from 'react';
import { parsing } from '../utils/crawl';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CourseItem from '../components/CourseItem/CourseItem';
import { Grid } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { Course } from '../types/Course';

function Search() {
	const [courses, setCourses] = useState<Course[]>([]);
	const [nomads, setNomads] = useState<Course[]>([]);

	//파라미터 가져오기
	const [query, setQuery] = useSearchParams();

	const keyword = query.get('keyword') || '';

	useEffect(() => {
		async function getData() {
			let inflearn_data = await parsing(keyword, 'inflearn');
			let nomad_data = await parsing(keyword, 'nomad');
			const filteredList = nomad_data.filter((it) => {
				if (it.title.includes(keyword) || it.content?.includes(keyword)) {
					return true;
				}
				return false;
			});

			setCourses(inflearn_data);
			setNomads(filteredList);
		}
		getData();
	}, [keyword]);

	return (
		<div>
			<h1>{keyword} 검색 목록</h1>

			<h2>인프런</h2>
			{
				<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 8, sm: 12, md: 16 }}>
					{courses.map((course, idx) => (
						<Grid item xs={4} sm={4} md={4} key={idx} mt={2}>
							<CourseItem course={course} size='sm' />
						</Grid>
					))}
				</Grid>
			}
			<h2>노마드 코더</h2>
			{
				<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 8, sm: 12, md: 16 }}>
					{nomads.map((course, idx) => (
						<Grid item xs={4} sm={4} md={4} key={idx} mt={2}>
							<CourseItem course={course} size='sm' />
						</Grid>
					))}
				</Grid>
			}
		</div>
	);
}

export default Search;
