import React, { useState } from "react";

function Signup(props) {
	const { signup, changeFormType, authErrorMsg } = props
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const signupFn = (val) => {
		if (username === "") {
			alert("email empty");
		} else if (password === "") {
			alert("password empty");
		} else {
			const data = {
				username: username,
				password: password,
				userType: val
			};

			signup(data);
		}
	}

	const updateUsername = (e) => {
		setUsername(e.target.value);
	}

	const updatePassword = (e) => {
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
					id="loginUsername"
					value={username}
					onChange={updateUsername}
				/>
			</div>
			<div className="form-group">
				<input
					type="password"
					className="form-control"
					placeholder="Password"
					id="loginPwd"
					value={password}
					onChange={updatePassword}
				/>
			</div>
			<div className="form-group">
				<input
					type="submit"
					className="form-control btn btn-primary"
					value="Signup as User"
					onClick={() => signupFn('user')}
				/>
			</div>
			<div className="form-group">
				<input
					type="submit"
					className="form-control btn btn-default"
					value="Signup as Vendor"
					onClick={() => signupFn('vendor')}
				/>
			</div>
			<div className="login-btn" onClick={() => changeFormType('login')}>Already have an Account ? Login</div>
			<div className="auth-error-msg">{authErrorMsg}</div>
		</>
	)
}

export default Signup;
