import { useState, useContext } from 'react'
import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
import {
  Link as RouterLink
} from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { UserNameContext } from '../Context/UserNameContext';
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
const url = 'https://api-for-missions-and-railways.herokuapp.com';

export default function SignUp() {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const { setIsAuthenticated } = useContext(AuthContext);
	const { userName, setUserName } = useContext(UserNameContext);

  const handleSubmit = (event) => {
    event.preventDefault();
		console.log('handleSubmit!');
		axios.post( `${url}/users`, { userName, email, password } )
			.then(res => {
				localStorage.setItem('auth_token', res.data.token);
				setIsAuthenticated(true);
				console.log('api return');
			})
			.catch(error => {
				console.log('...Error', error);
			})
			.finally(
				setIsAuthenticated(false)
			);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="ニックネーム"
                  autoFocus
									value={userName}
									onChange={event => setUserName(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="メールアドレス"
                  name="email"
                  autoComplete="email"
									value={email}
									onChange={event => setEmail(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="パスワード"
                  type="password"
                  id="password"
                  autoComplete="new-password"
									value={password}
									onChange={event => setPassword(event.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
									conponent={RouterLink}
									to="/login"
									variant="body2"
								>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}