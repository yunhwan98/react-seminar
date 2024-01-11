import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Box, Container, styled } from '@mui/material';
import Post from '../components/Post/Post';
import CourseItem from '../components/CourseItem/CourseItem';
import PostList from '../components/PostList/PostList';

const DetailWrapper = styled('div')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: '0.5rem',
}));

function Detail() {
	const { state } = useLocation();
	const { course } = state;

	return (
		<DetailWrapper>
			<CourseItem course={course} size={'lg'} />
			<PostList courseTitle={course.title} />
		</DetailWrapper>
	);
}

export default Detail;
