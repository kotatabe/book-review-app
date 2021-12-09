import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {
  Link
} from "react-router-dom";

export default function Login() {
	return (
		<body>
			<h2>Login</h2>
			<Form>
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
			<Link to="/signup">Sign up</Link>
		</body>
	);
}