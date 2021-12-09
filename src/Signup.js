import { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {
  Link
} from "react-router-dom";

export default function Signup() {
	const url = "https://api-for-missions-and-railways.herokuapp.com/users";

	const hundleSubmit = (e) => {
		console.log("hundleSubmit!");
		const form = new FormData(document.querySelector(".signup-form"));
		fetch(url, {
					method: "POST",
					body: form
			})
				.then(res => res.json())
				.then( data => {
					console.log("api return");
					// localStorage.setItem('auth_token', data.token);
				})
				.catch(error => {
					console.log('error: ', error);
				});
		e.preventDefault();
	}

	return (
		<div>
			<h2>Signup</h2>
			<Form onSubmit={hundleSubmit} className="signup-form" >
				<Form.Group className="mb-3">
					<Form.Label>ユーザー名</Form.Label>
					<Form.Control type="text" placeholder="User Name" />
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>メールアドレス</Form.Label>
					<Form.Control type="email" placeholder="Enter email" />
				</Form.Group>

				<Form.Group className="mb-3" >
					<Form.Label>パスワード</Form.Label>
					<Form.Control type="password" placeholder="Password" />
				</Form.Group>
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
			<Link to="/login">login</Link>
		</div>
	);
}