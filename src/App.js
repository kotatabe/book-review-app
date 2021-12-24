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

import Box from '@mui/material/Box';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ListItemIcon from '@mui/material/ListItemIcon';
import Link from '@mui/material/Link';

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
							>
								{info.title}
							</Link>
							{
								// info.url
							}
						</Box>
						// <li>
						// 	<div>
						// 		{info.title}
						// 	</div>
						// 	<div>
						// 		<a href={info.url}>書籍のURL</a> 
						// 	</div>
						// 	<div className="detail">
						// 		{info.detail} 
						// 	</div>
						// 	<hr />
						// </li>
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
