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
import Box from '@mui/material/Box';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ListItemIcon from '@mui/material/ListItemIcon';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { AuthContext } from './Context/AuthContext';
import ReviewDetail from './ReviewDetail';
import NewReviewModal from './PostNewReview';
import { bgcolor, borderColor } from '@mui/system';

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
				<NewReviewModal />
				<Box
					sx={{
						my: 2,
						border: 1,
						bgcolor: "grey.50",
						borderColor: "grey.300",
						borderRadius: 1,
					}}
				>
					<ul className='book-list-container'>
						{ bookList.map( (info) => 
							<Box
								component="div"
								sx={{
									p: 1,
									width: "100%",
									height: 100,
									bgcolor: 'inherit',
									borderBottom: "1px solid #dcdcdc",
									display: "flex",
									verticalAlign: "middle",
								}}
								>
								<Box
									sx={{
										// display: "flex",
										verticalAlign: "middle",
										borderRadius: "50%",
										width: 60,
										height: 60,
										bgcolor: "grey.500",
									}}
									>
									<ListItemIcon
										sx={{
											mx: "auto",
											p: 1,
											width: "100%",
											height: "100%",
											display: "flex",
											alignItems: "center",
										}}
									>
										<MenuBookIcon
											fontSize="large"
											sx={{
												m: "auto",
											}}
										/>
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
				</Box>
				<RouterLink to="/">Home</RouterLink> |{" "}
				<RouterLink to="signup">Sign up</RouterLink> |{" "}
				<RouterLink to="/login">login</RouterLink>
			</>
		) : (
			<Navigate to="/login" replace />
		)
	);
}
