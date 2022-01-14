// import {
// 	useState,
// } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';


export default function SimpleSnackBar({open, type, message, handleClose}) {

	const action = (
		<>
			<IconButton
				size="small"
				aria-label="close"
				color="inherit"
				onClick={handleClose}
			>
				<CloseIcon fontSize="small" />
			</IconButton>
		</>
	);

	return (
		<div>
			<Collapse in={open}>
				<Alert severity="success" action={action}>
					{message}
				</Alert>
			</Collapse>
		</div>
	);
}