import {
  useContext,
} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import { AlertStatContext } from '../Context/AlertStatContext';
import { BookListContext } from '../Context/BookListContext';

const apiUrl = 'https://api-for-missions-and-railways.herokuapp.com';

export const useReviewList = () => {
  const { authToken } = useContext(AuthContext);
  const { setBookList } = useContext(BookListContext);

  const getReviewList = (setIsLoading) => {
    setIsLoading(true);
    axios.get(`${apiUrl}/books?offset=0`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((res) => {
        setBookList(res.data);
      })
      .catch((error) => {
        console.log('...error', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { getReviewList };
};

export const useNewReview = () => {
  const { authToken } = useContext(AuthContext);
  const { status, setStatus } = useContext(AlertStatContext);

  const postNewReview = ({ title, url, detail, review }) => {
    axios.post(`${apiUrl}/books`, {
      title,
      url,
      detail,
      review,
    }, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((res) => {
        console.log('POST /books');
        console.log(res.data.title);
        setStatus({
          ...status, severity: 'success', open: true, message: 'レビューを作成しました',
        });
      })
      .catch((error) => {
        console.log('...Error', error);
        setStatus({
          ...status, severity: 'error', open: true, message: 'レビューの作成に失敗しました',
        });
      });
  }

  return { postNewReview };
}

export const useDeleteReview = () => {
  const { authToken } = useContext(AuthContext);
  const { status, setStatus } = useContext(AlertStatContext);
  const navigate = useNavigate();

  const deleteReview = ({ id }) => {
    axios.delete(`${apiUrl}/books/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then(() => {
        setStatus({
          ...status, severity: 'success', open: true, message: 'レビューを削除しました',
        });
        navigate('/');
      })
      .catch((error) => {
        setStatus({
          ...status, severity: 'error', open: true, message: 'レビューの削除に失敗しました',
        });
        console.log('Error', error);
      });
  };

  return { deleteReview };
};
