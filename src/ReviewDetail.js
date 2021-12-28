import axios from 'axios';
import {
	useContext,
	useEffect,
	useState,
} from 'react';
import {
	useParams,
	Link as RouterLink,
} from "react-router-dom";

import AccountCircle from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import { AuthContext } from './Context/AuthContext'
import EditReview from './EditReview'



const url = 'https://api-for-missions-and-railways.herokuapp.com';

export default function ReviewDetail () {
	const { auth_token } = useContext(AuthContext);
	const { id } = useParams();
	const [ reviewData, setReviewData ] = useState({});

	useEffect(() => {
		axios.get( `${url}/books/${id}`, {
			headers: {
				Authorization: `Bearer ${auth_token}`
			}
		})
			.then(res => {
				console.log('api return');
				setReviewData(res.data);
			})
			.catch(error => {
				console.log('...Error', error);
			});
	}, [])

	return (
		<>
			<Box
				sx ={{
					width: 600,
					border: 1,
					borderRadius: 2,
					borderColor: 'grey.400',
					p: 2,
					my: 2,
				}}
			>
				<Typography variant="h6" color="initial" sx={{ mb: 1 }}>
					{ reviewData.title }
				</Typography>
				<Button
					variant="contained"
					href={ reviewData.url }
				>
					本の詳細ページへ
				</Button>
				{ reviewData.isMine && (
					<Button
						component={RouterLink}
						to={`/edit/${reviewData.id}`}
						variant="outlined"
						sx={{
							height: 30,
							width: "auto",
						}}
					>
						レビューを編集する
					</Button>
				)}
				<Typography
					variant="subtitle1"
					color="initial"
					sx={{
						mb: 2
					}}
				>
					<AccountCircle sx={{ mr: 1 }} />
					{ reviewData.reviewer } さんの感想
				</Typography>
				<Typography variant="body2" color="initial" sx={{ mx: 2 }}>
					{ reviewData.review }
				</Typography>
			</Box>
		</>
	)
}