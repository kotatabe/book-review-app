import React from "react";
import {
  BrowserRouter,
  Routes,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.scss';
import { Home } from './Home';

export default function App() {
  return (
    <div>
      <h1>Hello React Router</h1>
      <Link to="/home">Home</Link> |{" "}
      <Link to="signup">Sign up</Link>|{" "}
      <Link to="/login">login</Link>
    </div>
  );
}
