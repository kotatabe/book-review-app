import { useState, useContext } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {
  Link
} from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { UserNameContext } from '../Context/UserNameContext';
import axios from 'axios';


function Signup() {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const { setIsAuthenticated } = useContext(AuthContext);
	const { userName, setUserName } = useContext(UserNameContext);
	const url = 'https://api-for-missions-and-railways.herokuapp.com/users';

	const hundleSubmit = (event) => {
		console.log('hundleSubmit!');
		event.preventDefault();
		axios.post( url, { userName, email, password } )
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
	}

	return (
		<>
			<h2>Signup</h2>
			<Form onSubmit={hundleSubmit} className="signup-form" >
				<Form.Group className="mb-3">
					<Form.Label>ユーザー名</Form.Label>
					<Form.Control 
						type="text"
						placeholder="User Name"
						value={userName}
						onChange={event => setUserName(event.target.value)}
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>メールアドレス</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						value={email}
						onChange={event => setEmail(event.target.value)}
					/>
				</Form.Group>
				<Form.Group className="mb-3" >
					<Form.Label>パスワード</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						value={password}
						onChange={event => setPassword(event.target.value)}
					/>
				</Form.Group>
				<Button variant="primary" type="submit">
					登録
				</Button>
			</Form>
			<Link to="/login">login</Link>
		</>
	);
}

export default Signup;