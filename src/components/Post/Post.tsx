import { Box, Rating, TextField, styled } from '@mui/material';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Review } from '../../types/Review';

interface PostProps {
	review?: Review;
	addList: (content: string, rating: number) => void;
	editList: (target: string, content: string, rating: number) => void;
	deleteList: (target: string) => void;
	changeMode: (target: string) => void;
}

const PostWrapper = styled('div')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	width: '100%',
}));

const ReviewForm = styled('form')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	width: '100%',
}));

const ButtonWrapper = styled('div')(({ theme }) => ({
	display: 'flex',
	width: '100%',
	gap: '0.5rem',
	alignItems: 'center',
	justifyContent: 'space-between',
}));

const Post = function Post({ review, addList, editList, deleteList, changeMode }: PostProps) {
	const [content, setContent] = useState<string>(review ? review.content : '');
	const [rating, setRating] = useState<number>(review ? review.rating : 0);

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (review) {
			editList(review.id, content, rating);
			return;
		}
		addList(content, rating);

		setContent('');
	};

	return (
		<PostWrapper>
			<ReviewForm onSubmit={submitHandler}>
				<TextField
					id='outlined-multiline-static'
					multiline
					rows={2}
					value={content}
					onChange={(e) => setContent(e.target.value)}
					name='content'
					sx={{ width: '100%' }}
				/>

				<ButtonWrapper>
					<Rating
						name='simple-controlled'
						value={rating}
						onChange={(event, newValue) => {
							setRating(newValue || 0);
						}}
					/>
					{review ? (
						<div>
							<Button onClick={() => changeMode(review.id)}>취소</Button>
							<Button type='submit'>수정</Button>
						</div>
					) : (
						<Button type='submit'>글쓰기</Button>
					)}
				</ButtonWrapper>
			</ReviewForm>
		</PostWrapper>
	);
};

export default Post;
