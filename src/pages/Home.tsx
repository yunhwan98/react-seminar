/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Grid, Typography } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';

import logo from '../logo.svg';

import { AppContext } from '../contexts';
import { APP_TITLE, PAGE_TITLE_HOME } from '../utils/constants';
import useInput from '../hooks/useInput';
import { parsing } from '../utils/crawl';
import CourseItem from '../components/CourseItem/CourseItem';

interface Review {
	title: string;
	content: string;
	rating?: string;
	id: number;
	edit: boolean;
}
interface Course {
	id: string;
	title: string;
	instructor?: string;
	price?: string;
	img: string;
	rating?: string;
	content?: string;
}
export const Home = () => {
	const context = useContext(AppContext);
	const [topList, setTopList] = useState<Course[]>([]);

	useEffect(() => {
		async function getData() {
			let data = await parsing('fe', 'top');
			setTopList(data);
		}
		getData();
	}, []);

	return (
		<>
			<Helmet>
				<title>
					{PAGE_TITLE_HOME} | {APP_TITLE}
				</title>
			</Helmet>

			<div>
				<h1>추천 강의 - 인프런</h1>
				<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 8, sm: 12, md: 16 }}>
					{topList.map((course, idx) => (
						<Grid item xs={4} sm={4} md={4} key={idx} mt={2}>
							<CourseItem course={course} size='sm' />
						</Grid>
					))}
				</Grid>
			</div>
		</>
	);
};
