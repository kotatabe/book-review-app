import { useState, useContext, useEffect } from 'react';
import { AuthContext } from './authContext';
import axios from 'axios';
import {
	Link
} from "react-router-dom";

const url = 'https://api-for-missions-and-railways.herokuapp.com/';


function Header () {
	const [ userName, setUserName ] = useState('');
	const auth_context = useContext(AuthContext);

	useEffect(() => {
		axios.get( url + 'users', {
			headers: {
				Authorization: `Bearer ${auth_context.auth_token}`
			}
		})
			.then(res => {
				console.log(res.data.name);
				setUserName(res.data.name);
			})
			.catch(error => console.log('...error', error))
	}, [])

	return (
		<header>
			<h1>Book Review App</h1>
			<div>
				{ auth_context.isAuthenticated ? (
					<div>
						ユーザー名：{ userName }
					</div>
					) : (
						<Link to="/login">ログイン</Link>
				)}
			</div>
		</header>
	);
}

export default Header;