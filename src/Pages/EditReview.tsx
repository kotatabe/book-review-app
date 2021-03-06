import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { AuthContext } from '../Context/AuthContext';
import { AlertStatContext } from '../Context/AlertStatContext';
import SimpleAlert from '../Alert';
import DeleteButton from '../DeleteButton';
import { Book, ReviewInterface } from './interface';

const url = 'https://api-for-missions-and-railways.herokuapp.com';

export default function EditReview() {
  const { id } = useParams();
  const { authToken } = useContext(AuthContext);
  const [reviewData, setReviewData] = useState({
    title: '',
    url: '',
    detail: '',
    review: '',
  });
  const { status, setStatus } = useContext(AlertStatContext);

  const inputStyle = {
    style: {
      fontSize: 12,
    },
  };

  useEffect(() => {
    axios
      .get<Book>(`${url}/books/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        console.log('GET /books/:id');
        setReviewData(res.data);
      })
      .catch((error) => {
        console.log('...Error', error);
      });
  }, [authToken, id]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(reviewData);
    axios
      .put<ReviewInterface>(
        `${url}/books/${id}`,
        {
          title: reviewData.title,
          url: reviewData.url,
          detail: reviewData.detail,
          review: reviewData.review,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      )
      .then((res) => {
        setReviewData({
          title: res.data.title,
          url: res.data.url,
          detail: res.data.detail,
          review: res.data.review,
        });
        setStatus({
          ...status,
          severity: 'success',
          open: true,
          message: '????????????????????????????????????',
        });
      })
      .catch((error) => {
        console.log('...Error', error);
      });
  };

  return (
    <>
      <SimpleAlert />
      <Box
        sx={{
          my: 3,
          p: 4,
          border: '2px solid #eeeeee',
          borderRadius: 1,
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <Typography variant="h5" color="initial" sx={{ mt: 0, flexGrow: 1 }}>
            ?????????????????????
          </Typography>
          <DeleteButton id={id} />
        </Box>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                inputProps={inputStyle}
                name="title"
                label="????????????"
                fullWidth
                value={reviewData.title}
                onChange={(e) =>
                  setReviewData((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputProps={inputStyle}
                name="url"
                fullWidth
                label="URL"
                value={reviewData.url}
                onChange={(e) =>
                  setReviewData((prev) => ({
                    ...prev,
                    url: e.target.value,
                  }))
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputProps={inputStyle}
                name="detail"
                fullWidth
                label="????????????"
                value={reviewData.detail}
                multiline
                rows={2}
                onChange={(e) =>
                  setReviewData((prev) => ({
                    ...prev,
                    detail: e.target.value,
                  }))
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputProps={inputStyle}
                name="review"
                fullWidth
                label="???????????????????????????"
                value={reviewData.review}
                multiline
                rows={6}
                onChange={(e) =>
                  setReviewData((prev) => ({
                    ...prev,
                    review: e.target.value,
                  }))
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, mb: 2, bgcolor: 'primary.light' }}
          >
            ?????????????????????
          </Button>
        </Box>
      </Box>
    </>
  );
}
