import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { render } from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';

import theme from './Theme/theme';
import Header from './Header'
import App from './App';
import Signup from './User/Signup';
import Login from './User/Login';
import Profile from './User/Profile';
import AlertStatProvider from './Context/AlertStatContext';
import AuthProvider from './Context/AuthContext';
import BookListProvider from './Context/BookListContext';
import UserNameProvider from './Context/UserNameContext';
import ReviewDetail from './Pages/ReviewDetail';
import EditReview from './Pages/EditReview';

const rootElement = document.getElementById('root');
render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <AlertStatProvider>
          <UserNameProvider>
            <BookListProvider>
              <Header />
              <Container component="main" maxWidth="sm">
                <Routes>
                  <Route path="/" element={<App />} />
                  <Route path="signup" element={<Signup />} />
                  <Route path="login" element={<Login />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="detail/:id" element={<ReviewDetail />} />
                  <Route path="edit/:id" element={<EditReview />} />
                </Routes>
              </Container>
            </BookListProvider>
          </UserNameProvider>
        </AlertStatProvider>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>,
  rootElement,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
