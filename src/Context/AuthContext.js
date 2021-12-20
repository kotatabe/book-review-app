import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
	isAuthenticated: false,
	setIsAuthenticated: () => {},
	auth_token: ''
});

const AuthProvider = (props) => {
	const [ isAuthenticated, setIsAuthenticated ] = useState(false);
	const auth_token = localStorage.getItem('auth_token');

	useEffect(() => {
		auth_token ? setIsAuthenticated(true) : setIsAuthenticated(false);
	}, [auth_token]);

	return (
		<AuthContext.Provider
						value={ {isAuthenticated, setIsAuthenticated, auth_token} }>
			{ props.children }
		</AuthContext.Provider>
	);
}

export default AuthProvider;