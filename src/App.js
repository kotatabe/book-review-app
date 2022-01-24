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
import './assets/App.css';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ListItemIcon from '@mui/material/ListItemIcon';
import Link from '@mui/material/Link';
import { ThemeProvider } from '@mui/material/styles';

import { AuthContext } from './Context/AuthContext';
import PostNewReview from './Pages/PostNewReview';
import Typography from '@mui/material/Typography'
import SimpleAlert from "./Alert";
import theme from './Theme/theme';
const url = 'https://api-for-missions-and-railways.herokuapp.com';

export default function App() {
	const [ bookList, setBookList ] = useState([]);
	const { auth_token, isAuthenticated } = useContext(AuthContext);

	useEffect(() => {
		axios.get( `${url}/books?offset=1`, {
			headers: {
				Authorization: `Bearer ${auth_token}`
			}
		})
			.then(res => {
				setBookList(res.data);
			})
			.catch(error => console.log('...error', error));
	}, [auth_token, bookList]);

	return (
		isAuthenticated ? (
			<>
				<ThemeProvider theme={theme}>
					<SimpleAlert />
					<PostNewReview setBookList={setBookList} />
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
							{ bookList.map( (book) => 
								<Box
									component="div"
									key={book.id}
									sx={{
										p: 2,
										width: "100%",
										height: 100,
										bgcolor: 'inherit',
										borderBottom: "1px solid #dcdcdc",
										display: "flex",
									}}
								>
									<Box
										sx={{
											borderRadius: "50%",
											width: 60,
											height: 60,
											bgcolor: "#e6ee9c",
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
												sx={{ m: "auto", }}
											/>
										</ListItemIcon>
									</Box>
									<Box
										sx={{
											width: 300,
											ml: 2,
											flexGrow: 1,
											overflow: "hidden",
											textOverflow: "ellipsis",
										}}
									>
										<Link
											variant="body1"
											component={RouterLink}
											to={`detail/${book.id}`}
											sx={{
												whiteSpace: "nowrap",
												fontWeight: "bold",
											}}
										>
											{book.title}
										</Link>
										<Typography variant="body2" color="initial">
											{book.reviewer}さんの感想
										</Typography>
									</Box>
									<Button
										component={RouterLink}
										to={`detail/${book.id}`}
										variant="outlined"
										sx={{
											my: "auto",
											height: "70%",
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
				</ThemeProvider>
			</>
		) : (
			<Navigate to="/login" replace />
		)
	);
}
