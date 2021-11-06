import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Header from '../../components/Common/Header.jsx';
import Sidebar from "../../components/VendorHome/Sidebar.jsx";
import { getLoginState, getVendorPayments } from './../../selectors/app';
import { logout as logoutRequest, fetchVendorPayments as fetchVendorPaymentsRequest } from './../../actions/app';
import "../../../styles/vendorPayments.scss";

function VendorPayments(props) {
	const { isLoggedIn, logout, fetchVendorPayments, vendorPayments } = props;

	useEffect(() => {
		const data = {
			userId: localStorage.getItem("userId")
		};

		fetchVendorPayments(data);
	}, []);

	return (
		<div id="vendorPaymentsPage">
			<Header
				isLoggedIn={isLoggedIn}
				logout={logout}
			/>
			<div className="container">
				<div className="row">
					<div className="vendor-payments-wrapper">
						<Sidebar activeTab="payments" />
						<div className="vendor-payments-box">
							<div className="vendor-payments-title">Vendor Payments</div>
							{
								vendorPayments.length > 0 ? vendorPayments.map((item) => (
									<div className="vendor-payments-item">
										<div className="vendor-payments-item-title">Order Summary</div>
										<div className="vendor-payments-item-products">
											{
												item.products.map((product) => (
													<div className="vendor-payments-item-product">
														<div className="vendor-payments-item-product-img">
															<img src="https://img.favpng.com/8/17/0/product-design-clip-art-logo-food-png-favpng-TsCQEsJH2LUYN3d5Q6RzrTsqL.jpg" />
														</div>
														<div className="vendor-payments-item-product-details">
															<div className="vendor-payments-item-product-name">
																{product.name}
															</div>
															<div className="vendor-payments-item-product-price">
																{product.price}
															</div>
															<div className="vendor-payments-item-product-quantity">
																Quantity: {product.quantity}
															</div>
														</div>
													</div>
												))
											}
										</div>
										<div className="vendor-payments-item-total">Total: {item.total}</div>
									</div>
								)) : (
									<div className="no-payments-found">No Payments Found</div>
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
	fetchVendorPayments: (data) => dispatch(fetchVendorPaymentsRequest(data))
});

const mapStateToProps = createStructuredSelector({
	isLoggedIn: getLoginState(),
	vendorPayments: getVendorPayments()
});

export default connect(mapStateToProps, mapDispatchToProps)(VendorPayments);