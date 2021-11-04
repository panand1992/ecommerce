import React, { useState } from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getLoginState } from './../../selectors/app';
import { userLogin as userLoginRequest } from './../../actions/app';

function Home(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const loginFn = () => {
		const { login } = props;

		if (username === "") {
			alert("email empty");
		} else if (password === "") {
			alert("password empty");
		} else {
			const data = {
				username: username,
				password: password
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
		<div id="homePage">
			<div className="container">
				<div className="row">
					<div className="loginWrapper">
						<h2 className="text-center">Welcome to Ecommerce</h2>
						<h4 className="text-center">Login</h4>
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
								className="form-control"
								value="Log in"
								onClick={loginFn}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const mapDispatchToProps = (dispatch) => ({
	userLogin: (data) => dispatch(userLoginRequest(data))
});

const mapStateToProps = createStructuredSelector({
	isLoggedIn: getLoginState()
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);