import React, { useState } from "react";

function Signup(props) {
	const { signup, changeFormType, authErrorMsg, updateAuthErrorMsg } = props
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const signupFn = () => {
		if (username === "") {
			updateAuthErrorMsg("Email should not be empty");
		} else if (password === "") {
			updateAuthErrorMsg("Password should not be empty");
		} else {
			const data = {
				userData: {
					username: username,
					password: password,
					userType: 'user'
				}
			};

			signup(data);
		}
	}

	const updateUsername = (e) => {
		updateAuthErrorMsg("");
		setUsername(e.target.value);
	}

	const updatePassword = (e) => {
		updateAuthErrorMsg("");
		setPassword(e.target.value);
	}

	return (
		<>
			<h4 className="text-center">Signup</h4>
			<div className="form-group">
				<input
					type="text"
					className="form-control"
					placeholder="Username"
					value={username}
					onChange={updateUsername}
				/>
			</div>
			<div className="form-group">
				<input
					type="password"
					className="form-control"
					placeholder="Password"
					value={password}
					onChange={updatePassword}
				/>
			</div>
			<div className="form-group">
				<input
					type="submit"
					className="form-control btn btn-primary"
					value="Signup as User"
					onClick={signupFn}
				/>
			</div>
			<div className="login-btn" onClick={() => changeFormType('login')}>Already have an Account ? Login</div>
			<div className="login-btn" onClick={() => changeFormType('vendorSignup')}>Want to Sell ? Signup as Vendor</div>
			<div className="auth-error-msg">{authErrorMsg}</div>
		</>
	)
}

export default Signup;
