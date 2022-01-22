import {
	useState,
} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useReview } from './Hook/useReview';

export default function DeleteButton({id}) {
  const [open, setOpen] = useState(false);
	const { deleteReview } = useReview();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
				<DeleteIcon color="action" />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"レビューを削除します。"}
        </DialogTitle>
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
            レビューを削除します。
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button onClick={() => {
						deleteReview(id);
						handleClose();
					}}>
            削除する
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}