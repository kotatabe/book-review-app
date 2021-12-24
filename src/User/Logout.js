import {
	// useState,
	useContext,
	// useEffect
} from 'react';
import {
	useNavigate, // === useHistory
	Link,
} from "react-router-dom";
import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
import Button from '@mui/material/Button';
import { AuthContext } from '../Context/AuthContext';
import { UserNameContext } from '../Context/UserNameContext';

export const useLogout = () => {
	const navigate = useNavigate();
	const { setIsAuthenticated } = useContext(AuthContext);

	const logout = () => {
		localStorage.removeItem('auth_token');
		setIsAuthenticated(false);
		navigate("/login");
	}

	const profile = () => {
		navigate("/profile");
	}

	return { logout, profile };
}
