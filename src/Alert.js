import {
  useContext,
} from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { AlertStatContext } from './Context/AlertStatContext';

export default function SimpleAlert() {
  const { status, handleClose } = useContext(AlertStatContext);

  return (
    <div>
      <Snackbar
        open={status.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={status.severity}>
          {status.message}
        </Alert>
      </Snackbar>
    </div>
  );
}