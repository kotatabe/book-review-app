import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './index.scss';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Header from './Header.js'
import App from './App';
import Signup from './User/Signup';
import Login from './User/Login';
import Profile from './User/Profile';
import { render } from "react-dom";
import AuthProvider from './Context/AuthContext.js';
import { UserNameProvider } from './Context/UserNameContext.js';
import AlertStatProvider from './Context/AlertStatContext';
import Container from '@mui/material/Container';
import ReviewDetail from './ReviewDetail.js';
import EditReview from './EditReview.js';
import BasicTable from './table.js';

const rootElement = document.getElementById("root");
render(
	<BrowserRouter>
		<AuthProvider>
			<AlertStatProvider>
				<UserNameProvider>
						<Header />
						<Container component="main" maxWidth="sm">
							<Routes>
								<Route path="/" element={<App />} />
								<Route path="signup" element={<Signup />} />
								<Route path="login" element={<Login />} />
								<Route path="profile" element={<Profile />} />
								<Route path="detail/:id" element={<ReviewDetail />} />
								<Route path="edit/:id" element={<EditReview />} />
								<Route path="/table" element={<BasicTable />} />
							</Routes>
						</Container>
				</UserNameProvider>
			</AlertStatProvider>
		</AuthProvider>
	</BrowserRouter>,
	rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
