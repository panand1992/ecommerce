import React from 'react';

import "../../../styles/header.scss";

function Header(props) {
	const { username, isLoggedIn, logout } = props;

	const logoutUser = () => {
		localStorage.removeItem('userId');
		localStorage.removeItem('username');
		localStorage.removeItem('userType');
		logout();
	}

	return (
		<div id="header">
			<div className="container">
				<div className="row">
					<div className="header-wrapper">
						<div className="logo">Ecommerce</div>
						{
							isLoggedIn && (
								<div className="user-actions">
									<div className="user-intro">Hi {username}</div>
									<div className="logout-btn" onClick={logoutUser}>Logout</div>
								</div>
							)
						}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Header;