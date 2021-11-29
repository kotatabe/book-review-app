import * as React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
// import './index.scss';
import {
  BrowserRouter,
  Routes,
  Switch,
  Route
} from "react-router-dom";
import App from './App';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
// import reportWebVitals from './reportWebVitals';

// https://reactrouter.com/docs/en/v6/getting-started/tutorial
import { render } from "react-dom";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="home" element={<Home />} />
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
