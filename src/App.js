import * as React from 'react';
import {
	useEffect,
	useContext
} from 'react';
import {
	Navigate,
	Link as RouterLink,
} from "react-router-dom";
import './assets/App.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ListItemIcon from '@mui/material/ListItemIcon';
import Link from '@mui/material/Link';
import { ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography'

import { AuthContext } from './Context/AuthContext';
import { BookListContext } from './Context/BookListContext';
import { useReviewList } from './Hook/useReview';
import PostNewReview from './Pages/PostNewReview';
import SimpleAlert from "./Alert";
import theme from './Theme/theme';

export default function App() {
	const { bookList } = useContext(BookListContext);
	const { auth_token, isAuthenticated } = useContext(AuthContext);
	const { getReviewList } = useReviewList();

	useEffect( () => {
		getReviewList();
	}, [auth_token]);

	return (
		isAuthenticated ? (
			<>
				<ThemeProvider theme={theme}>
					<SimpleAlert />
					<PostNewReview />
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
