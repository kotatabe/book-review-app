import {
	useContext,
} from 'react';
import {
	useNavigate, // === useHistory
	// Link,
} from "react-router-dom";
import { AuthContext } from '../Context/AuthContext';
import { AlertStatContext } from '../Context/AlertStatContext';

export const useProfile = () => {
	const navigate = useNavigate();
	const { setIsAuthenticated } = useContext(AuthContext);
	const { status, setStatus } = useContext(AlertStatContext);

	const logout = () => {
		localStorage.removeItem('auth_token');
		setIsAuthenticated(false);
		setStatus({ ...status, severity: "success", open: true, message: "ログアウトしました" });
		navigate("/login");
	}

	const profile = () => {
		navigate("/profile");
	}

	return { logout, profile };
}
