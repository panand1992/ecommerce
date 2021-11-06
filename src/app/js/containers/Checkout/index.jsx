import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from "react-router-dom";

import Header from '../../components/Common/Header.jsx';
import {
	getLoginState, getOrderDetails, getConfirmPaymentLoading, getConfirmPaymentErrorMsg,
	getConfirmPaymentSuccess
} from './../../selectors/app';
import {
	logout as logoutRequest, fetchOrderDetails as fetchOrderDetailsRequest,
	editOrder as editOrderRequest
} from './../../actions/app';
import "../../../styles/checkout.scss";

function Checkout(props) {
	const { isLoggedIn, logout, fetchOrderDetails, orderDetails, confirmPaymentLoading, editOrder,
		confirmPaymentErrorMsg, confirmPaymentSuccess } = props;

	useEffect(() => {
		const data = {
			userId: localStorage.getItem('userId')
		};

		fetchOrderDetails(data);
	}, []);

	const confirmPaymentFn = () => {
		const data = {
			orderId: orderDetails.orderId,
			userId: localStorage.getItem('userId'),
			payment: true
		};

		editOrder(data);
	}

	return (
		<div id="cartPage">
			<Header
				isLoggedIn={isLoggedIn}
				logout={logout}
			/>
			<div className="container">
				<div className="row">
					<div className="cart-title">Checkout</div>
					<div className="cart-wrapper">
						{
							orderDetails.total && orderDetails.total > 0 ? (
								<>
									<div className="order-details">
										<div className="order-details-title">Order Summary</div>
										{
											orderDetails.products.map((product) => (
												<div className="order-details-product" key={product.productId}>
													<div className="order-details-product-img">
														<img src="https://img.favpng.com/8/17/0/product-design-clip-art-logo-food-png-favpng-TsCQEsJH2LUYN3d5Q6RzrTsqL.jpg" />
													</div>
													<div className="order-details-product-data">
														<div>{product.name}</div>
														<div>&#8377; {product.price}</div>
													</div>
												</div>
											))
										}
									</div>
									<div className="price-details">
										<div className="price-details-box">
											<div className="price-details-title">Price Details</div>
											<div className="price-details-data">
												<div className="price-details-item">
													<div>Price</div>
													<div>&#8377; {orderDetails.total}</div>
												</div>
												<div className="price-details-item">
													<div>Discount</div>
													<div>&#8377; 0</div>
												</div>
												<div className="price-details-item">
													<div>Delivery Charges</div>
													<div>FREE</div>
												</div>
												<div className="price-details-item">
													<div>Total</div>
													<div>&#8377; {orderDetails.total}</div>
												</div>
											</div>
										</div>
										{
											confirmPaymentSuccess ? (
												<>
													<div className="confirm-payment-success-msg">Order Confirmed</div>
													<Link
														to="/"
														className="btn btn-default continue-shopping-btn"
													>
														Continue Shopping
													</Link>
												</>
											) : (
												<>
													<div
														className="confirm-payment-btn btn btn-primary"
														onClick={confirmPaymentFn}
														disabled={confirmPaymentLoading}
													>
														Confirm Payment
													</div>
													<div
														className="confirm-payment-error-msg"
													>
														{confirmPaymentErrorMsg}
													</div>
												</>
											)
										}
									</div>
								</>
							) : (
								<div className="empty-cart">Your Cart is Empty</div>
							)
						}
					</div>
				</div>
			</div>
		</div>
	)
}

const mapDispatchToProps = (dispatch) => ({
	logout: () => dispatch(logoutRequest()),
	fetchOrderDetails: (data) => dispatch(fetchOrderDetailsRequest(data)),
	editOrder: (data) => dispatch(editOrderRequest(data)),
});

const mapStateToProps = createStructuredSelector({
	isLoggedIn: getLoginState(),
	orderDetails: getOrderDetails(),
	confirmPaymentLoading: getConfirmPaymentLoading(),
	confirmPaymentErrorMsg: getConfirmPaymentErrorMsg(),
	confirmPaymentSuccess: getConfirmPaymentSuccess()
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);