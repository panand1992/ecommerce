import React, { useState } from "react";
import { useNavigate } from "react-router";

import Login from './Login.jsx';
import Signup from './Signup.jsx';
import VendorSignup from './VendorSignup.jsx';
import "../../../styles/login.scss";

function LoginWrapper(props) {
    const navigate = useNavigate();
	const { login, signup, authErrorMsg } = props;
	const [currentFormType, setCurrentFormType] = useState('login');

    const changeFormType = (val) => {
        setCurrentFormType(val);
    }

	return (
		<div className="login-wrapper">
            {
                currentFormType === 'login' && (
                    <Login
                        login={login}
                        changeFormType={changeFormType}
                        authErrorMsg={authErrorMsg}
                        navigate={navigate}
                    />
                )
            }
            {
                currentFormType === 'signup' && (
                    <Signup
                        signup={signup}
                        changeFormType={changeFormType}
                        authErrorMsg={authErrorMsg}
                    />
                )
            }
            {
                currentFormType === 'vendorSignup' && (
                    <VendorSignup
                        signup={signup}
                        changeFormType={changeFormType}
                        authErrorMsg={authErrorMsg}
                        navigate={navigate}
                    />
                )
            }
		</div>
	)
}

export default LoginWrapper;
