import { useState, useContext } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {
  Link
} from 'react-router-dom';
import { AuthContext } from './authContext';
import axios from 'axios';


export default function Signup() {
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const url = 'https://api-for-missions-and-railways.herokuapp.com/users';
	const auth_context = useContext(AuthContext);

	const hundleSubmit = (event) => {
		console.log('hundleSubmit!');
		axios.post( url, { name, email, password } )
			.then(res => {
				localStorage.setItem('auth_token', res.data.token);
				auth_context.setIsAuthenticated(true);
				console.log('api return');
			})
			.catch(error => {
				console.log('Error', error);
			});
		event.preventDefault();
	}

	return (
		<div>
			<h2>Signup</h2>
			<Form onSubmit={hundleSubmit} className='signup-form' >
				<Form.Group className='mb-3'>
					<Form.Label>ユーザー名</Form.Label>
					<Form.Control 
						type='text'
						placeholder='User Name'
						value={name}
						onChange={event => setName(event.target.value)}
					/>
				</Form.Group>
				<Form.Group className='mb-3'>
					<Form.Label>メールアドレス</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter email'
						value={email}
						onChange={event => setEmail(event.target.value)}
					/>
				</Form.Group>
				<Form.Group className='mb-3' >
					<Form.Label>パスワード</Form.Label>
					<Form.Control
						type='password'
						placeholder='Password'
						value={password}
						onChange={event => setPassword(event.target.value)}
					/>
				</Form.Group>
				<Button variant='primary' type='submit'>
					Submit
				</Button>
			</Form>
			<Link to='/login'>login</Link>
		</div>
	);
}