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
import Typography from '@mui/material/Typography';
import { AuthContext } from '../Context/AuthContext'


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
				console.log('GET /books/:id');
				setReviewData(res.data);
			})
			.catch(error => {
				console.log('...Error', error);
			});
	}, [auth_token, id])

	return (
		<>
			<Box
				sx ={{
					width: 600,
					border: 1,
					borderRadius: 2,
					borderColor: 'grey.400',
					p: 4,
					my: 2,
				}}
			>
				<Typography variant="h6" color="initial" sx={{ mb: 1 }}>
					{ reviewData.title }
				</Typography>
				<Typography
					variant="caption"
					color="initial"
					sx={{
						display: "block",
						mb: 1,
						ml: 1,
					}}
				>
					<AccountCircle sx={{ mr: 1, size: "small" }} />
					{ reviewData.reviewer } さんの感想
				</Typography>
				<Typography variant="body2" color="initial"
					sx={{
						p: 2,
						mb: 2,
						border: 1,
						borderColor: "grey.400",
						borderRadius: 1,
						minHeight: 80,
					}}>
					{ reviewData.review }
				</Typography>
				<Box sx={{display: "flex", justifyContent: "flex-end"}}>
					<Button
						variant="outlined"
						href={ reviewData.url }
						sx={{mr: 1}}
					>
						本の詳細ページへ
					</Button>
					{ reviewData.isMine && (
						<Button
							component={RouterLink}
							// state={{
							// 	reviewData: reviewData,
							// 	setReviewData: setReviewData
							// }}
							to={`/edit/${reviewData.id}`}
							variant="contained"
						>
							レビューを編集する
						</Button>
					)}
				</Box>
			</Box>
		</>
	)
}