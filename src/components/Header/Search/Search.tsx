import { alpha, InputBase, styled, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchButton = styled('button')(({ theme }) => ({
	border: 0,
	backgroundColor: 'transparent',
}));

export const Search = () => {
	const [keyword, setKeyword] = useState('');
	const navigate = useNavigate();

	const keywordHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setKeyword(e.target.value);
		console.log(e.target.value);
	};

	return (
		<Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
			<SearchWrapper>
				<StyledInputBase
					placeholder='검색어를 입력해주세요...'
					inputProps={{ 'aria-label': 'search' }}
					onChange={keywordHandler}
				/>
				<SearchButton
					onClick={() => {
						navigate(`/search?keyword=${keyword}`);
					}}
				>
					<SearchIcon />
				</SearchButton>
			</SearchWrapper>
		</Box>
	);
};

const SearchWrapper = styled('div')(({ theme }) => ({
	display: 'flex',
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(3),
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
}));
