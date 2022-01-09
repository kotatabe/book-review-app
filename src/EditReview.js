import {
  BrowserRouter,
  Routes,
  Route,
	useLocation,
	useParams,
} from "react-router-dom";
import axios from 'axios';
import {
	useContext,
	useEffect,
	useState,
} from 'react';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from './Context/AuthContext'



const url = 'https://api-for-missions-and-railways.herokuapp.com';

export default function EditReview () {
	const { id } = useParams();
	const { auth_token } = useContext(AuthContext);
	const [ reviewData, setReviewData ] = useState({});
	// const location = useLocation();
	// const { reviewData, setReviewData } = location.state;

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

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(reviewData);
		axios.put(
			`${url}/books/${id}`,
			{
				"title": reviewData.title,
				"url": reviewData.url,
				"detail": reviewData.detail,
				"review": reviewData.review,
			},
			{
				headers: {
					Authorization: `Bearer ${auth_token}`
				}
			})
				.then(res => {
				setReviewData({
						title: res.data.title,
						url: res.data.url,
						detail: res.data.detail,
						review: res.data.review,
					});
				})
				.catch(error => {
					console.log('...Error', error);
				});
	}

	return (
		<>
			<Typography variant="h5" color="initial" sx={{mt: 2}}>
				書籍の編集
			</Typography>
			<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							name="title"
							fullWidth
							label="タイトル"
							value={ reviewData.title }
							onChange={ e => setReviewData( prev => (
								{
									...prev,
									title: e.target.value,
								}
							))}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							name="url"
							fullWidth
							label="URL"
							value={ reviewData.url }
							onChange={ e => setReviewData( prev => (
								{
									...prev,
									url: e.target.value,
								}
							))}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							name="detail"
							fullWidth
							label="本の概要"
							value={ reviewData.detail }
							multiline
							rows={2}
							onChange={ e => setReviewData( prev => (
								{
									...prev,
									detail: e.target.value,
								}
							))}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							name="review"
							fullWidth
							label="本のレビュー・感想"
							value={ reviewData.review }
							multiline
							rows={5}
							onChange={ e => setReviewData( prev => (
								{
									...prev,
									review: e.target.value,
								}
							))}
						/>
					</Grid>
				</Grid>
				<Button
					type="submit"
					variant="contained"
					fullWidth
					sx={{ mt: 3, mb: 2 }}
				>
					編集を完了する
				</Button>
			</Box>
		</>
	)
}