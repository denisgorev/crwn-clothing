import React from "react";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../button/custom-button.component";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

import "./sign-in.styles.scss";

class SignIn extends React.Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
		};
	}

	handleSubmit = (event) => {
		const { email, password } = this.state;
		event.preventDefault();
		try {
            auth.signInWithEmailAndPassword(email, password);
            this.setState({ email: "", password: "" });
		} catch (err) {
			console.log(err);
		}

		
	};

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
		// console.log(this.state);
	};
	render() {
		return (
			<div className='sign-in'>
				<h2>I already have an account</h2>
				<span>Sign in with your email and password</span>
				<form onSubmit={this.handleSubmit}>
					<FormInput
						name='email'
						type='email'
						label='email'
						value={this.state.email}
						handleChange={this.handleChange}
						required
					/>

					<FormInput
						name='password'
						type='password'
						label='password'
						value={this.state.password}
						handleChange={this.handleChange}
						required
					/>
					<div className='buttons'>
						<CustomButton type='submit'>Sign In</CustomButton>
						<CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn>
							Sign up with Google
						</CustomButton>
					</div>
				</form>
			</div>
		);
	}
}

export default SignIn;
