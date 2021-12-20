import { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {
	Navigate,
  Link
} from "react-router-dom";
import { AuthContext } from './Context/AuthContext';
import axios from 'axios';


export default function Login() {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const { setIsAuthenticated, isAuthenticated }  = useContext(AuthContext);
	const url = 'https://api-for-missions-and-railways.herokuapp.com/signin';

	const hundleSubmit = (event) => {
		event.preventDefault();
		axios.post( url, { email, password } )
			.then(res => {
				localStorage.setItem('auth_token', res.data.token);
				setIsAuthenticated(true);
				console.log('api return');
			})
				.catch(error => {
					console.log('...Error', error);
				})
				.finally(
					setIsAuthenticated(false)
				);
		console.log('hundleSubmit!');
	}

	return (
		isAuthenticated ? (
			<Navigate to="/" replace />
		) : (
			<div>
				<h2>Login</h2>
				<Form onSubmit={hundleSubmit} className='signup-form'>
					<Form.Group className="mb-3">
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter email"
							value={email}
							onChange={event => setEmail(event.target.value)}
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Password"
							value={password}
							onChange={event => setPassword(event.target.value)}
						/>
					</Form.Group>
					<Button variant="primary" type="submit">
						ログイン
					</Button>
				</Form>
				<Link to="/signup">Sign up</Link>
			</div>
		)
	);
}