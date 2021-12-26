import * as React from 'react';
import {
	useState,
} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField'
import { useNewReview } from './useNewReview';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function NewReviewModal() {
	const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
	const [ title, setTitle ] = useState('');
	const [ url, setUrl ] = useState('');
	const [ detail, setDetail ] = useState('');
	const [ review, setReview ] = useState('');
	const { new_review } = useNewReview();

	const hundelSubmit = (event) => {
		event.preventDefault();
		new_review({
			title, url, detail, review
		});
		handleClose();
	}

	return (
		<div>
			<Button onClick={handleOpen}>レビューの新規作成</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
			>
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h2" sx={{my: 2}}>
						レビューの投稿
					</Typography>
					<Box component="form" onSubmit={hundelSubmit}>
						<TextField
							// margin="normal"
							placeholder="タイトル"
							value={title}
							onChange={event => setTitle(event.target.value)}
							autoFocus
							fullWidth
						/>
						<TextField
							margin="normal"
							placeholder="URL"
							value={url}
							onChange={event => setUrl(event.target.value)}
							fullWidth
						/>
						<TextField
							margin="normal"
							placeholder="詳細"
							value={detail}
							onChange={event => setDetail(event.target.value)}
							fullWidth
						/>
						<TextField
							margin="normal"
							placeholder="レビューや感想を書く"
							value={review}
							autoFocus
							onChange={event => setReview(event.target.value)}
							fullWidth
							multiline
							rows={5}
						/>
							<Button
								type="submit"
								variant="contained"
								sx={{ mt: 2, mb: 2 }}
							>
								投稿する
							</Button>
					</Box>
        </Box>
      </Modal>
    </div>
  );
}