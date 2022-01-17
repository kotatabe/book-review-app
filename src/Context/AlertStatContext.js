import {
	createContext,
	useState
} from 'react';

export const AlertStatContext = createContext({
	status: {},
	setStaus: () => {},
	handleClose: () => {},
});

const AlertStatProvider = (props) => {
	const [ status, setStatus ] = useState({
		open: false,
		severity: "success",
		message: "成功しました。",
	});

	const handleClose = (reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setStatus({...status, open: false});
	};

	return (
		<AlertStatContext.Provider
						value={{ status, setStatus, handleClose}}>
			{ props.children }
		</AlertStatContext.Provider>
	);
}

export default AlertStatProvider;