import * as React from 'react';
import {
	useState,
	useContext,
} from 'react';
import {
	useNavigate,
} from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField'
import { useNewReview } from './useNewReview';
import { AlertStatContext } from './Context/AlertStatContext';
import SimpleAlert from "./Alert";

const inputStyle = {
	style: {
		fontSize: 13,
	},
}

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '40%',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	maxHeight: 700,
	minWidth: 500,
	overflow: 'scroll',
	px: 4,
	py: 2,
};

export default function NewReviewModal() {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const { new_review } = useNewReview();
	const [ reviewData, setReviewData ] = useState({
		title: '',
		url: '',
		detail: '',
		review: '',
	});
	const navigate = useNavigate();

	const hundelSubmit = (event) => {
		event.preventDefault();
		new_review({
			title: reviewData.title,
			url: reviewData.url,
			detail: reviewData.detail,
			review: reviewData.review,
		});
		// navigate("/", { replace: true });
	}

	return (
		<>
			<SimpleAlert />
			<Button variant="contained" onClick={handleOpen} >レビューの新規作成</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
			>
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h2" sx={{mb: 2}}>
						レビューの投稿
					</Typography>
					<Box component="form" onSubmit={hundelSubmit}>
						<TextField
							inputProps={inputStyle}
							placeholder="タイトル"
							value={reviewData.title}
							onChange={event => setReviewData(prev =>({
								...prev,
								title: event.target.value,
							}))}
							autoFocus
							fullWidth
						/>
						<TextField
							inputProps={inputStyle}
							margin="normal"
							placeholder="URL"
							value={reviewData.url}
							onChange={event => setReviewData(prev =>({
								...prev,
								url: event.target.value,
							}))}
							fullWidth
						/>
						<TextField
							inputProps={inputStyle}
							margin="normal"
							placeholder="詳細"
							value={reviewData.detail}
							onChange={event => setReviewData(prev =>({
								...prev,
								detail: event.target.value,
							}))}
							fullWidth
							multiline
							rows={5}
						/>
						<TextField
							inputProps={inputStyle}
							margin="normal"
							placeholder="レビューや感想を書く"
							value={reviewData.review}
							onChange={event => setReviewData(prev =>({
								...prev,
								review: event.target.value,
							}))}
							fullWidth
							multiline
							rows={5}
						/>
						<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
							<Button
								variant="outlined"
								onClick={handleClose}
								sx={{ my: 2, mr: 2,}}
								>
								閉じる
							</Button>
							<Button
								type="submit"
								variant="contained"
								sx={{ my: 2,}}
							>
								投稿する
							</Button>
						</Box>
					</Box>
        </Box>
      </Modal>
    </>
  );
}