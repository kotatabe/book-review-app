import * as React from 'react';
import {
  Link
} from "react-router-dom";
import './App.scss';

export default function App() {
  return (
    <div>
      <h1>Hello React Router</h1>
      <Link to="/">Home</Link> |{" "}
      <Link to="signup">Sign up</Link> |{" "}
      <Link to="/login">login</Link>
    </div>
  );
}
