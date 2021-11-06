import React from 'react';
import { Link } from 'react-router-dom';

import "../../../styles/header.scss";

function Header(props) {
	const { isLoggedIn, logout } = props;
	const username = localStorage.getItem("username");
	const userType = localStorage.getItem("userType");

	const logoutUser = () => {
		localStorage.removeItem('userId');
		localStorage.removeItem('username');
		localStorage.removeItem('userType');
		logout();
		location.replace("/");
	}

	return (
		<div id="header">
			<div className="container">
				<div className="row">
					<div className="header-wrapper">
						<div className="logo">
							<Link to={"/"}>Ecommerce</Link>
						</div>
						{
							isLoggedIn && (
								<div className="user-actions">
									{
										userType == 2 && (
											<Link to={"/vendor"}>Vendor Dashboard</Link>
										)
									}
									<Link to={"/cart"}>Cart</Link>
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