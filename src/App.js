import * as React from 'react';
import {
	useEffect,
	useState,
	useContext
} from 'react';
import {
	Navigate,
	Link as RouterLink,
} from "react-router-dom";
import './assets/App.scss';
import axios from 'axios';
import { AuthContext } from './Context/AuthContext';
import ReviewDetail from './ReviewDetail';
import NewReviewModal from './PostNewReview';

import Box from '@mui/material/Box';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ListItemIcon from '@mui/material/ListItemIcon';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';

const url = 'https://api-for-missions-and-railways.herokuapp.com';

export default function App() {
	const [ bookList, setBookList ] = useState([]);
	const { auth_token, isAuthenticated } = useContext(AuthContext);

	useEffect(() => {
		// localStorage.removeItem('auth_token');
		axios.get( `${url}/books?offset=1`, {
			headers: {
				Authorization: `Bearer ${auth_token}`
			}
		})
			.then(res => {
				setBookList(res.data);
				console.log(res.data);
				console.log('api return');
			})
			.catch(error => console.log('...error', error));
	}, [auth_token]);

	return (
		isAuthenticated ? (
			<>
				{/* <Button variant="contained" sx={{ my: 2 }}>
					レビューを投稿する
				</Button> */}
				<NewReviewModal />
				<ul className='book-list-container'>
					{ bookList.map( (info) => 
						<Box
							component="li"
							sx={{
								width: 650,
								height: 150,
								bgcolor: "#fff",
								borderBottom: "1px solid #dcdcdc",
								display: "flex",
								verticalAlign: "middle",
							}}
						>
							<Box
								sx={{
									width: 80,
									height: 108,
									bgcolor: "#e2e2e2",
								}}
							>
								<ListItemIcon>
									<MenuBookIcon fontSize="large" />
								</ListItemIcon>
							</Box>
							<Link
								conponent={RouterLink}
								to="#"
								sx={{
									mx: 1,
									mr: 3,
								}}
							>
								{info.title}
							</Link>
							{/* {
								info.review
							} */}
							<Button
								component={RouterLink}
								to={`detail/${info.id}`}
								variant="outlined"
								verticalAlign="middle"
								display="inline-block"
								sx={{
									height: 30,
									width: "auto",
								}}
							>
								レビューを読む
							</Button>
						</Box>
					)}
				</ul>
				<RouterLink to="/">Home</RouterLink> |{" "}
				<RouterLink to="signup">Sign up</RouterLink> |{" "}
				<RouterLink to="/login">login</RouterLink>
			</>
		) : (
			<Navigate to="/login" replace />
		)
	);
}
