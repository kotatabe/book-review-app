import * as React from 'react';
import {
	useContext,
} from 'react';
import {
	Link as RouterLink,
} from "react-router-dom";
import { useProfile } from './Hook/useProfile'
import { AuthContext } from './Context/AuthContext';
import { UserNameContext } from './Context/UserNameContext';

import AccountCircle from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Link from '@mui/material/Link';
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function Header () {
	const { isAuthenticated } = useContext(AuthContext);
	const { userName } = useContext(UserNameContext);
	const [ anchorEl, setAnchorEl ] = React.useState(null);
	const { logout, profile } = useProfile();

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
				sx={{
					borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
					bgcolor: "#4ea6cc",
				}}
			>
				<Toolbar sx={{ flexWrap: 'wrap' }}>
					<Typography
						variant="h6"
						color="inherit"
						sx={{ flexGrow: 1 }}
					>
						<Link
							component={RouterLink}
							to="/"
							underline="none"
							color="inherit"
						>
							Book Review App
						</Link>
					</Typography>
					{isAuthenticated ? (
						<>
							<Typography
								color="initial"
								sx={{ minWidth: 100, my: 1, mx: 1.5 }}
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
							<MenuItem onClick={() => {
								logout();
								handleClose();
							}}>
								<ListItemIcon>
									<LogoutIcon fontSize="small" />
								</ListItemIcon>
								ログアウト
							</MenuItem>
						</Menu>
						</>
					) : (
						<Link
							component={RouterLink}
							to="/login"
						>
							ログイン
						</Link>
					)}
				</Toolbar>
			</AppBar>
			<Box sx={{ height: "1em", mb: 1, }}></Box>
		</header>
	);
}

export default Header;