import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Header from '../../components/Common/Header.jsx';
import { getLoginState, getOrderDetails } from './../../selectors/app';
import {
	logout as logoutRequest, fetchOrderDetails as fetchOrderDetailsRequest,
	editOrder as editOrderRequest
} from './../../actions/app';
import "../../../styles/cart.scss";
import { Link } from "react-router-dom";

function Cart(props) {
	const { isLoggedIn, logout, fetchOrderDetails, orderDetails, editOrder } = props;

	useEffect(() => {
		const data = {
			userId: localStorage.getItem('userId')
		};

		fetchOrderDetails(data);
	}, []);

	const updateProductQuantity = (e, productId) => {
		const data = {
			productId,
			quantity: e.target.value,
			orderId: orderDetails.orderId,
			userId: localStorage.getItem('userId')
		};

		editOrder(data);
	}

	const removeProductFromCart = (productId, quantity) => {
		const data = {
			productId,
			quantity,
			orderId: orderDetails.orderId,
			userId: localStorage.getItem('userId'),
			remove: true
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
					<div className="cart-title">My Cart</div>
					<div className="cart-wrapper">
						{
							orderDetails.total && orderDetails.total > 0 ? (
								<>
									<div className="order-details">
										<div className="order-details-title">Order Details</div>
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
													<div className="order-details-product-actions">
														<div className="order-details-product-quantity">
															<div>Quantity</div>
															<div className="form-group">
																<select
																	className="form-select"
																	onChange={
																		(e) => updateProductQuantity(e, product.productId)
																	}
																	value={product.quantity}
																>
																	<option value="1">1</option>
																	<option value="2">2</option>
																	<option value="3">3</option>
																	<option value="4">4</option>
																	<option value="5">5</option>
																</select>
															</div>
														</div>
														<div
															className="order-details-product-remove btn btn-default"
															onClick={
																() => removeProductFromCart(product.productId, product.quantity)
															}
														>
															Remove
														</div>
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
										<Link to={"/"} className="continue-shopping-btn btn btn-default">
											Continue Shopping
										</Link>
										<Link to={"/checkout"} className="checkout-btn btn btn-primary">Checkout</Link>
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
	editOrder: (data) => dispatch(editOrderRequest(data))
});

const mapStateToProps = createStructuredSelector({
	isLoggedIn: getLoginState(),
	orderDetails: getOrderDetails()
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);