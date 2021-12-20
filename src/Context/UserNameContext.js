import {
	createContext,
	useContext,
	useEffect,
	useState
} from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const url = 'https://api-for-missions-and-railways.herokuapp.com';

export const UserNameContext = createContext({
	userName: "",
	setUserName: () => {}
});

export const UserNameProvider = (props) => {
	const [ userName, setUserName ] = useState("");
	const { auth_token } = useContext(AuthContext);

	useEffect(() => {
		axios.get( `${url}/users`, {
			headers: {
				Authorization: `Bearer ${auth_token}`
			}
		})
			.then(res => {
				console.log(res.data.name);
				setUserName(res.data.name);
			})
			.catch(error => console.log('...error', error));
			// .finally(
			// 	// localStorage.removeItem('auth_token')
			// );
	}, [auth_token]);

	return (
		<UserNameContext.Provider value={{ userName, setUserName }}>
			{props.children}
		</UserNameContext.Provider>
	);
}
