import React, { useState } from "react";

function Login(props) {
	const { login, changeFormType, authErrorMsg, navigate } = props
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const loginFn = () => {
		if (username === "") {
			alert("email empty");
		} else if (password === "") {
			alert("password empty");
		} else {
			const data = {
				userData : {
					username: username,
					password: password
				},
				navigate
			};

			login(data);
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
			<h4 className="text-center">Login</h4>
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
					value="Log in as User"
					onClick={loginFn}
				/>
			</div>
			<div className="signup-btn" onClick={() => changeFormType('signup')}>Dont have an Account ? Signup</div>
			<div className="auth-error-msg">{authErrorMsg}</div>
		</>
	)
}

export default Login;
