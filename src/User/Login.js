import { useState, useContext } from 'react';
// import Button from 'react-bootstrap/Button';
import {
	Navigate,
  // Link as RouterLink
} from "react-router-dom";
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AlertStatContext } from '../Context/AlertStatContext';
import SimpleAlert from "../Alert"

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();
const url = 'https://api-for-missions-and-railways.herokuapp.com/signin';

export default function SignIn() {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const { setIsAuthenticated, isAuthenticated }  = useContext(AuthContext);
	const { status, setStatus } = useContext(AlertStatContext);

	const handleSubmit = (event) => {
		event.preventDefault();
		axios.post( url, { email, password } )
		.then(res => {
			localStorage.setItem('auth_token', res.data.token);
			setIsAuthenticated(true);
			setStatus({ ...status, severity: "success", open: true, message: "ログインが完了しました" });
		})
			.catch(error => {
				console.log('...Error', error);
				setStatus({ ...status, severity: "error", open: true, message: "ログインに失敗しました" });
			})
			.finally(
				setIsAuthenticated(false)
			);
		console.log('handleSubmit!');
	};

  return (
		isAuthenticated ? (
			<Navigate to="/" replace />
		) : (
			<ThemeProvider theme={theme}>
				<Container component="main" maxWidth="xs">
					<SimpleAlert />
					<CssBaseline />
					<Box
						sx={{
							marginTop: 8,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Login
						</Typography>
						<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
							<TextField
								margin="normal"
								required
								fullWidth
								id="email"
								label="メールアドレス"
								name="email"
								autoComplete="email"
								autoFocus
								value={email}
								onChange={event => setEmail(event.target.value)}
							/>
							<TextField
								margin="normal"
								required
								fullWidth
								name="password"
								label="パスワード"
								type="password"
								id="password"
								autoComplete="current-password"
								value={password}
								onChange={event => setPassword(event.target.value)}
							/>
							<FormControlLabel
								control={<Checkbox value="remember" color="primary" />}
								label="Remember me"
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
							>
								Sign In
							</Button>
							<Grid container>
								<Grid item xs>
									<Link href="#" variant="body2">
										Forgot password?
									</Link>
								</Grid>
								<Grid item>
									<Link href="#" variant="body2">
										{"Don't have an account? Sign Up"}
									</Link>
								</Grid>
							</Grid>
						</Box>
					</Box>
					<Copyright sx={{ mt: 8, mb: 4 }} />
				</Container>
			</ThemeProvider>
		)
  );
}