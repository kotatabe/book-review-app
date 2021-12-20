import * as React from 'react';
import {
	useEffect,
	useState,
	useContext
} from 'react';
import {
	Navigate,
	Link
} from "react-router-dom";
import './assets/App.scss';
import axios from 'axios';
import { AuthContext } from './Context/AuthContext';

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
						<li>
							<div>
								{info.title}
							</div>
							<div>
								<a href={info.url}>書籍のURL</a> 
							</div>
							<div className="detail">
								{info.detail} 
							</div>
							<hr />
						</li>
					)}
				</ul>
				<Link to="/">Home</Link> |{" "}
				<Link to="signup">Sign up</Link> |{" "}
				<Link to="/login">login</Link>
			</>
		) : (
			<Navigate to="/login" replace />
		)
	);
}
