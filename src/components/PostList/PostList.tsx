import { Box, Button, Rating, styled } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import Post from '../Post/Post';
import Paper from 'material-ui/Paper';
import Card from '@mui/material/Card';
import { v4 as uuidv4 } from 'uuid';
import { Review } from '../../types/Review';

interface PostProps {
	courseTitle: string;
}

const PostListWrapper = styled('div')(({ theme }) => ({
	display: 'flex',
	width: '40%',
	flexDirection: 'column',
	alignItems: 'center',
	gap: '0.5rem',
}));

const PostWrapper = styled('div')(({ theme }) => ({
	display: 'flex',

	width: '100%',
}));

const ButtonWrapper = styled('div')(({ theme }) => ({
	display: 'flex',
	width: '100%',
	gap: '0.5rem',
	alignItems: 'end',
	justifyContent: 'space-between',
}));

const TitleWrapper = styled('div')(({ theme }) => ({
	display: 'flex',
	width: '100%',
	justifyContent: 'start',
}));

function PostList({ courseTitle }: PostProps) {
	const [list, setList] = useState<Review[]>([]);

	//리뷰 생성
	const addList = (content: string, rating: number) => {
		const newReview = { content, id: uuidv4(), edit: false, courseTitle, rating };
		const editedList = [...list, newReview];

		localStorage.setItem(courseTitle, JSON.stringify(editedList));
		setList(editedList);
	};
	//리뷰 수정
	const editList = (target: string, content: string, rating: number) => {
		const editedList = list.map((it, idx) =>
			it.id == target
				? {
						...it,
						content,
						edit: false,
				  }
				: it
		);
		localStorage.setItem(courseTitle, JSON.stringify(editedList));
		setList(editedList);
	};

	//리뷰 삭제
	const deleteList = (target: string) => {
		const editedList = list.filter((it, idx) => it.id !== target);
		localStorage.setItem(courseTitle, JSON.stringify(editedList));
		setList(editedList);
	};

	//글쓰기 모드 변경
	const changeMode = (target: string) => {
		const editedList = list.map((it) => (it.id === target ? { ...it, edit: !it.edit } : it));
		localStorage.setItem(courseTitle, JSON.stringify(editedList));
		setList(editedList);
	};

	useEffect(() => {
		const reviews = localStorage.getItem(courseTitle);
		if (reviews) {
			const target = JSON.parse(reviews) as Review[];
			setList(target);
		}
	}, [courseTitle]);

	return (
		<PostListWrapper>
			<TitleWrapper>
				<h4>강의 후기</h4>
			</TitleWrapper>
			{list.map((it, idx) => (
				<PostWrapper key={idx}>
					{!it.edit ? (
						<Card sx={{ width: '100%', padding: '0.5rem' }}>
							<div>{it.content}</div>
							<div>
								<ButtonWrapper>
									<Rating name='read-only' value={it.rating} readOnly />
									<div>
										<Button onClick={() => changeMode(it.id)}>수정</Button>
										<Button onClick={() => deleteList(it.id)}>삭제</Button>
									</div>
								</ButtonWrapper>
							</div>
						</Card>
					) : (
						<Post review={it} addList={addList} editList={editList} deleteList={deleteList} changeMode={changeMode} />
					)}
				</PostWrapper>
			))}
			<Post addList={addList} editList={editList} deleteList={deleteList} changeMode={changeMode} />
		</PostListWrapper>
	);
}

export default PostList;
