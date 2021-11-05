import React, { useState } from "react";

import Login from './Login.jsx';
import Signup from './Signup.jsx';
import "../../../styles/login.scss";

function LoginWrapper(props) {
	const { login, signup, authErrorMsg } = props
	const [currentFormType, setCurrentFormType] = useState('login');

    const changeFormType = (val) => {
        setCurrentFormType(val);
    }

	return (
		<div className="login-wrapper">
            {
                currentFormType === 'login' ? (
                    <Login
                        login={login}
                        changeFormType={changeFormType}
                        authErrorMsg={authErrorMsg}
                    />
                ) : (
                    <Signup
                        signup={signup}
                        changeFormType={changeFormType}
                        authErrorMsg={authErrorMsg}
                    />
                )
            }
		</div>
	)
}

export default LoginWrapper;
