import * as React from 'react';
import {
	useContext,
} from 'react';
import {
	Link as RouterLink,
	useNavigate, // === useHistory
} from "react-router-dom";
import { Logout } from './User/Logout'
import { useLogout } from './User/Logout'
import { AuthContext } from './Context/AuthContext';
import { UserNameContext } from './Context/UserNameContext';

import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import GlobalStyles from '@mui/material/GlobalStyles';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Link from '@mui/material/Link';
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


function Header () {
	const { isAuthenticated } = useContext(AuthContext);
	const { userName } = useContext(UserNameContext);
	const { setIsAuthenticated } = useContext(AuthContext);
	const [ anchorEl, setAnchorEl ] = React.useState(null);
	const { logout, profile } = useLogout();
	// const navigate = useNavigate();

	// const logout = () => {
	// 	localStorage.removeItem('auth_token');
	// 	setIsAuthenticated(false);
	// 	navigate("/login");
	// }

	// const handleChange = (event) => {
  //   setAuth(event.target.checked);
  // };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
	return (
		<header>
			<GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
			<CssBaseline />
			<AppBar
				position="static"
				color="default"
				elevation={0}
				sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
			>
				<Toolbar sx={{ flexWrap: 'wrap' }}>
				{/* <Toolbar> */}
					<Typography
						variant="h6"
						color="inherit"
						noWrap
						sx={{ flexGrow: 1 }}
					>
						Book Review App
					</Typography>
						{isAuthenticated ? (
							<>
								<Typography sx={{ minWidth: 100 }}
									color="initial"
									sx={{ my: 1, mx: 1.5 }}
								>
									ユーザー名：{ userName }
								</Typography>
								<IconButton
									size="large"
									aria-label="account of current user"
									aria-controls="menu-appbar"
									aria-haspopup="true"
									onClick={handleMenu}
									color="inherit"
									noWrap
								>
									<AccountCircle />
								</IconButton>
								<Menu
									id="menu-appbar"
									anchorEl={anchorEl}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									open={Boolean(anchorEl)}
									onClose={handleClose}
								>
								<MenuItem onClick={profile}>プロフィール</MenuItem>
								<MenuItem onClick={handleClose}>アカウント</MenuItem>
								<MenuItem onClick={logout}>
									<ListItemIcon>
										<LogoutIcon fontSize="small" />
									</ListItemIcon>
									ログアウト
								</MenuItem>
							</Menu>
							</>
						) : (
							<Link
								conponent={RouterLink}
								to="/login"
							>
								ログイン
							</Link>
						)}
				</Toolbar>
			</AppBar>
		</header>
	);
}

export default Header;