import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {
  BrowserRouter,
  Routes,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function Signup() {
	return (
		<body>
			<h2>Signup</h2>
			<Form>
				<Form.Group className="mb-3" controlId="formName">
					<Form.Label>ユーザー名</Form.Label>
					<Form.Control type="text" placeholder="User Name" />
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email" placeholder="Enter email" />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" />
				</Form.Group>
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
			<Link to="/login">login</Link>
		</body>
	);
}