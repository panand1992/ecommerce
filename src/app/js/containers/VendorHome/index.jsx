import React from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Header from '../../components/Common/Header.jsx';
import Sidebar from "../../components/VendorHome/Sidebar.jsx";
import { getLoginState } from './../../selectors/app';
import { logout as logoutRequest } from './../../actions/app';
import "../../../styles/vendorHome.scss";

function VendorHome(props) {
	const { isLoggedIn, logout } = props;

	return (
		<div id="vendorHomePage">
			<Header
				isLoggedIn={isLoggedIn}
				logout={logout}
			/>
			<div className="container">
				<div className="row">
					<div className="vendor-home-wrapper">
						<Sidebar activeTab="home" />
						<div className="vendor-home-box">
							Welcome to Vendor Dashboard
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const mapDispatchToProps = (dispatch) => ({
	logout: () => dispatch(logoutRequest())
});

const mapStateToProps = createStructuredSelector({
	isLoggedIn: getLoginState()
});

export default connect(mapStateToProps, mapDispatchToProps)(VendorHome);