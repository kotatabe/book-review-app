import {
	useContext,
} from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { AlertStatContext } from './Context/AlertStatContext';

export default function SimpleAlert() {
	const { status, handleClose } = useContext(AlertStatContext);
	// const action = (
	// 	<>
	// 		<IconButton
	// 			size="small"
	// 			aria-label="close"
	// 			color="inherit"
	// 			onClick={handleClose}
	// 		>
	// 			<CloseIcon fontSize="small" />
	// 		</IconButton>
	// 	</>
	// );

	return (
		<div>
			<Snackbar
				// anchorOrigin={{ vertical: '', horizontal: '' }}
				open={status.open}
				autoHideDuration={6000}
				// action={action}
				onClose={handleClose}
			>
				<Alert onClose={handleClose} severity={status.severity}>
					{status.message}
				</Alert>
			</Snackbar>
		</div>
	);
}