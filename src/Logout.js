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
import Button from 'react-bootstrap/Button';
import { AuthContext } from './Context/AuthContext';
import { UserNameContext } from './Context/UserNameContext';

export function Logout() {
	const navigate = useNavigate();
	const { setIsAuthenticated } = useContext(AuthContext);

	const hundleSubmit = () => {
		localStorage.removeItem('auth_token');
		setIsAuthenticated(false);
		navigate("/login");
	}

	return (
		<div>
			<Form onSubmit={hundleSubmit}>
				<Button type="submit" size="sm">
					ログアウト
				</Button>
			</Form>
		</div>
	)
}
