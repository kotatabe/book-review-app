import {
	useContext,
} from 'react';
import {
	Link,
} from "react-router-dom";
import { Logout } from './User/Logout'
import { AuthContext } from './Context/AuthContext';
import { UserNameContext } from './Context/UserNameContext';

function Header () {
	const { isAuthenticated } = useContext(AuthContext);
	const { userName } = useContext(UserNameContext);

	return (
		<header>
			<h1>Book Review App</h1>
			<div>
				{ isAuthenticated ? (
					<div>
						<div>
							ユーザー名：{ userName }
						</div>
						<Link to='/profile'>ユーザー情報の編集</Link>
						<Logout />
					</div>
					) : (
						<Link to="/login">ログイン</Link>
				)}
			</div>
		</header>
	);
}

export default Header;