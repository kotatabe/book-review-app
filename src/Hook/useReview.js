import {
	useContext,
} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import { AlertStatContext } from '../Context/AlertStatContext';
import { BookListContext } from '../Context/BookListContext';

const api_url = 'https://api-for-missions-and-railways.herokuapp.com';

export const useReviewList = () => {
	const { auth_token } = useContext(AuthContext);
	const { setBookList } = useContext(BookListContext);

	const getReviewList = () => {
		axios.get( `${api_url}/books?offset=0`, {
			headers: {
				Authorization: `Bearer ${auth_token}`
			}
		})
			.then(res => {
				setBookList(res.data);
			})
			.catch(error => console.log('...error', error));
	}
	return { getReviewList };
}

export const useNewReview = () => {
	const { auth_token } = useContext(AuthContext);
	const { status, setStatus } = useContext(AlertStatContext);

	const postNewReview = ({title, url, detail, review}) => {
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
	return { postNewReview };
}

export const useDeleteReview = () => {
	const { auth_token } = useContext(AuthContext);
	const { status, setStatus } = useContext(AlertStatContext);
	const navigate = useNavigate();

	const deleteReview = ({id}) => {
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
	return { deleteReview };
}
