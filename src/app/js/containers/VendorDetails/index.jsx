import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Header from '../../components/Common/Header.jsx';
import Sidebar from "../../components/VendorHome/Sidebar.jsx";
import { getLoginState, getVendorDetails } from './../../selectors/app';
import { logout as logoutRequest, fetchVendorDetails as fetchVendorDetailsRequest } from './../../actions/app';
import "../../../styles/vendorDetails.scss";

function VendorDetails(props) {
	const { isLoggedIn, logout, fetchVendorDetails, vendorDetails } = props;

	useEffect(() => {
		const data = {
			userId: localStorage.getItem('userId')
		};

		fetchVendorDetails(data);
	}, []);

	return (
		<div id="vendorDetailsPage">
			<Header
				isLoggedIn={isLoggedIn}
				logout={logout}
			/>
			<div className="container">
				<div className="row">
					<div className="vendor-details-wrapper">
						<Sidebar activeTab="vendorDetails" />
						<div className="vendor-details-box">
							<div className="vendor-details-title">Vendor Details</div>
							{
								vendorDetails.pan && (
									<div className="vendor-details-data">
										<div className="vendor-details-item">
											<div className="vendor-details-key">Username</div>
											<div className="vendor-details-val">{vendorDetails.username}</div>
										</div>
										<div className="vendor-details-item">
											<div className="vendor-details-key">GSTIN</div>
											<div className="vendor-details-val">{vendorDetails.gstin}</div>
										</div>
										<div className="vendor-details-item">
											<div className="vendor-details-key">PAN</div>
											<div className="vendor-details-val">{vendorDetails.pan}</div>
										</div>
									</div>
								)
							}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const mapDispatchToProps = (dispatch) => ({
	logout: () => dispatch(logoutRequest()),
	fetchVendorDetails: (data) => dispatch(fetchVendorDetailsRequest(data))
});

const mapStateToProps = createStructuredSelector({
	isLoggedIn: getLoginState(),
	vendorDetails: getVendorDetails()
});

export default connect(mapStateToProps, mapDispatchToProps)(VendorDetails);