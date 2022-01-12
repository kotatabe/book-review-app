import {
	useParams,
} from "react-router-dom";
import axios from 'axios';
import {
	useContext,
	useEffect,
	useState,
} from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { AuthContext } from './Context/AuthContext'

import SimpleSnackBar from "./SnackBar";

const url = 'https://api-for-missions-and-railways.herokuapp.com';

export default function EditReview () {
	const { id } = useParams();
	const { auth_token } = useContext(AuthContext);
	const [ reviewData, setReviewData ] = useState({});
	const [ status, setStatus ] = useState({
		open: false,
		type: "success",
		message: "成功しました。",
	});

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setStatus({...status, open: false});
	};

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
					setStatus({ ...status, open: true })
				})
				.catch(error => {
					console.log('...Error', error);
				});
	}

	return (
		<>
			<Box sx={{
				my: 3,
				p: 3,
				border: '2px solid #eeeeee',
				borderRadius: 1,
			}}>
				<Typography variant="h5" color="initial" sx={{mt: 0}}>
					書籍の編集
				</Typography>
				<SimpleSnackBar
					open={status.open}
					type={status.type}
					message={status.message}
					handleClose={handleClose}
					/>
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								name="title"
								label="タイトル"
								fullWidth
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
			</Box>
		</>
	)
}