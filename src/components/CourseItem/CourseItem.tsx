import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

import { styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { convertRating } from '../../utils/convertRating';
import { Course } from '../../types/Course';

interface CourseProps {
	course: Course;
	size: string;
}

const CourseWrapper = styled(Card)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
}));

const SmallImage = styled('img')(({ theme }) => ({
	width: '100%',
}));

const LargeImage = styled('img')(({ theme }) => ({
	height: '400px',
	width: '100%',
}));

const InfoWrapper = styled('div')(({ theme }) => ({
	flex: '1',
	display: 'flex',
	alignItems: 'end',
	padding: '1rem',
	paddingTop: 0,
}));

const RatingWrapper = styled('div')(({ theme }) => ({
	flex: '1',
	display: 'flex',
	flexDirection: 'column',
	fontSize: '0.9rem',
	fontWeight: 'bold',
	gap: '0.5rem',
}));

const RightBox = styled('div')(({ theme }) => ({
	flex: '1',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'end',
	fontSize: '0.9rem',
	fontWeight: 'bold',
	gap: '0.5rem',
}));

function CourseItem({ course, size }: CourseProps) {
	const navigate = useNavigate();

	//detail 페이지로 이동
	const moveDetail = () => {
		navigate(`/detail/${course.id}`, {
			state: {
				course: { ...course },
			},
		});
	};

	return (
		<CourseWrapper
			sx={{ width: size === 'sm' ? 300 : '40%', height: size === 'sm' ? 345 : '50%' }}
			onClick={moveDetail}
		>
			{size === 'sm' ? (
				<SmallImage src={course.img} alt='course_img' />
			) : (
				<LargeImage src={course.img} alt='course_img' />
			)}
			<CardContent>
				<Typography sx={{ fontWeight: 'bold' }}>{course.title}</Typography>
				{course.content && (
					<Typography mt={5} variant='body2' color='text.secondary'>
						{course.content}
					</Typography>
				)}
			</CardContent>

			<InfoWrapper>
				<RatingWrapper>
					{course.rating && (
						<>
							강의평점
							<Rating
								name='text-feedback'
								value={convertRating(course.rating)}
								readOnly
								precision={0.5}
								emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />}
							/>
						</>
					)}
				</RatingWrapper>
				<RightBox>
					<div className='instructor'>{course.instructor}</div>
					{course.price && <div className='price'>{course.price}</div>}
				</RightBox>
			</InfoWrapper>
		</CourseWrapper>
	);
}

export default CourseItem;
