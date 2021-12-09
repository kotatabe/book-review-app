import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './index.scss';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from './App';
import Signup from './Signup';
import Login from './Login';
import { render } from "react-dom";
import AuthProvider from './authContext.js';

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
