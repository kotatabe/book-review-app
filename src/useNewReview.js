import {
	// useState,
	useContext,
	// useEffect
} from 'react';
// import {
// 	useNavigate, // === useHistory
// 	Link,
// } from "react-router-dom";
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import Button from '@mui/material/Button';
import { AuthContext } from './Context/AuthContext';
// import { UserNameContext } from './Context/UserNameContext';
import axios from 'axios';

const api_url = 'https://api-for-missions-and-railways.herokuapp.com';

export const useNewReview = () => {
	const { auth_token } = useContext(AuthContext);

	const new_review = ({title, url, detail, review}) => {
		axios.post( `${api_url}/books`, { 
			title,
			url,
			detail,
			review
		}, {
			headers: {
				Authorization: `Bearer ${auth_token}`
			} 
		})
			.then(res => {
				console.log('api return');
				console.log(res.data.title);
			})
			.catch(error => {
				console.log('...Error', error);
			});
	}

	return { new_review };
}
