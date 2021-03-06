import axios from 'axios';
import {
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  useParams,
  Link as RouterLink,
} from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AuthContext } from '../Context/AuthContext';
import { Book } from './interface';

const url = 'https://api-for-missions-and-railways.herokuapp.com';

export default function ReviewDetail() {
  const { authToken } = useContext(AuthContext);
  const { id } = useParams();
  const [reviewData, setReviewData] = useState<Book | null>(null);

  useEffect(() => {
    axios.get<Book>(`${url}/books/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((res) => {
        setReviewData(res.data);
      })
      .catch((error) => {
        console.log('...Error', error);
      });
  }, [authToken, id]);

  return (
    <Box
      sx={{
        width: 600,
        border: 1,
        borderRadius: 2,
        borderColor: 'border.main',
        p: 4,
        my: 2,
      }}
    >
      <Typography variant="h6" color="initial" sx={{ mb: 3 }}>
        {reviewData?.title}
      </Typography>
      <Typography
        variant="caption"
        color="initial"
        sx={{
          display: "block",
          mb: 1,
          ml: 0.5,
        }}
      >
        <AccountCircle sx={{ mr: 1, size: "small" }} />
        {reviewData?.reviewer} さんの感想
      </Typography>
      <Typography variant="body2" color="initial"
        sx={{
          p: 2,
          mb: 2,
          border: 1,
          borderColor: "border.main",
          borderRadius: 1,
          minHeight: 80,
        }}>
        {reviewData?.review}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          href={reviewData?.url}
          sx={{ mr: 1 }}
        >
          本の詳細ページへ
        </Button>
        {reviewData?.isMine && (
          <Button
            component={RouterLink}
            to={`/edit/${reviewData?.id}`}
            variant="contained"
            sx={{ bgcolor: "primary.light" }}
          >
            レビューを編集する
          </Button>
        )}
      </Box>
    </Box>
  );
}
