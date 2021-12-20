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
import Signup from './Signup';
import Login from './Login';
import Profile from './Profile';
import { render } from "react-dom";
import AuthProvider from './Context/AuthContext.js';
import { UserNameProvider } from './Context/UserNameContext.js';

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <AuthProvider>
      <UserNameProvider>
          <Header />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
      </UserNameProvider>
    </AuthProvider>
  </BrowserRouter>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
