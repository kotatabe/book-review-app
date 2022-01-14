import {
	useContext,
} from 'react';
import {
	useNavigate, // === useHistory
	// Link,
} from "react-router-dom";
import { AuthContext } from '../Context/AuthContext';

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
