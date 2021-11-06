import React, { useState } from "react";

function Signup(props) {
	const { signup, changeFormType, authErrorMsg, navigate, updateAuthErrorMsg } = props
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [gstin, setGstin] = useState('');
	const [pan, setPan] = useState('');

	const signupFn = () => {
		if (username === "") {
			updateAuthErrorMsg("Email should not be empty");
		} else if (password === "") {
			updateAuthErrorMsg("Password should not be empty");
		} else if (gstin === "") {
			updateAuthErrorMsg("GSTIN should not be empty");
		} else if (pan === "") {
			updateAuthErrorMsg("PAN should not be empty");
		} else {
			const data = {
				userData: {
					username: username,
					password: password,
					gstin: gstin,
					pan: pan,
					userType: 'vendor'
				},
				navigate
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

	const updateGstin = (e) => {
		updateAuthErrorMsg("");
		setGstin(e.target.value);
	}

	const updatePan = (e) => {
		updateAuthErrorMsg("");
		setPan(e.target.value);
	}

	return (
		<>
			<h4 className="text-center">Vendor Signup</h4>
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
					type="password"
					className="form-control"
					placeholder="GSTIN"
					value={gstin}
					onChange={updateGstin}
				/>
			</div>
			<div className="form-group">
				<input
					type="password"
					className="form-control"
					placeholder="PAN"
					value={pan}
					onChange={updatePan}
				/>
			</div>
			<div className="form-group">
				<input
					type="submit"
					className="form-control btn btn-primary"
					value="Signup as Vendor"
					onClick={signupFn}
				/>
			</div>
			<div className="login-btn" onClick={() => changeFormType('login')}>Already have an Account ? Login</div>
			<div className="login-btn" onClick={() => changeFormType('signup')}>Want to shop ? Signup as User</div>
			<div className="auth-error-msg">{authErrorMsg}</div>
		</>
	)
}

export default Signup;
