import {
	useContext,
} from 'react';
import {
	useNavigate,
} from "react-router-dom";
import { AuthContext } from './Context/AuthContext';
import axios from 'axios';
import { AlertStatContext } from './Context/AlertStatContext';

const api_url = 'https://api-for-missions-and-railways.herokuapp.com';

export const useNewReview = () => {
	const { auth_token } = useContext(AuthContext);
	const { status, setStatus } = useContext(AlertStatContext);
	const navigate = useNavigate();

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
				console.log('POST /books');
				console.log(res.data.title);
				setStatus({ ...status, severity: "success", open: true, message: "レビューを作成しました" });
			})
			.catch(error => {
				console.log('...Error', error);
				setStatus({ ...status, severity: "error", open: true, message: "レビューの作成に失敗しました" });
			});
	}

	const deleteReview = ({id}) => {
		console.log(id);
		axios.delete( `${api_url}/books/${id}`, {
			headers: {
				Authorization: `Bearer ${auth_token}`
			} 
		})
			.then(() => {
				setStatus({ ...status, severity: "success", open: true, message: "レビューを削除しました" });
				navigate("/");
			})
			.catch(error => {
				setStatus({ ...status, severity: "error", open: true, message: "レビューの削除に失敗しました" });
				console.log("Error", error);
			});
	}

	return { new_review, deleteReview };
}
