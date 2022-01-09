import {
	useContext,
	useState,
	// useEffect
} from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import {
	//   Link
	// } from 'react-router-dom';
import { UserNameContext } from '../Context/UserNameContext';
import { AuthContext } from '../Context/AuthContext';
const url = 'https://api-for-missions-and-railways.herokuapp.com';

function Profile () {
	const { userName, setUserName } = useContext(UserNameContext);
	const [ name, setName ] = useState(userName);
	const { auth_token } = useContext(AuthContext);

	const handleSubmit = (event) => {
		event.preventDefault();
		axios.put( `${url}/users`, { name/*: name*/ }, {
			headers: {
				Authorization: `Bearer ${auth_token}`
			}
		})
			.then(res => {
				setUserName(res.data.name);
				setName('');
				console.log(res.data.name);
			})
			.catch(error => {
				console.log('...Error', error);
			});
	}

	return (
		<>
			<h2>ユーザー情報の編集</h2>
			<Form onSubmit={handleSubmit} className="signup-form" >
				<Form.Group className="mb-3">
					<Form.Label>ユーザー名</Form.Label>
					<Form.Control
						type="text"
						placeholder={userName}
						value={name}
						onChange={event => setName(event.target.value)}
					/>
				</Form.Group>
				<Button variant="primary" type="submit">
					登録
				</Button>
			</Form>
		</>
	);
}

export default Profile;