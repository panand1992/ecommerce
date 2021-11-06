import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useNavigate, useParams } from "react-router";

import Header from '../../components/Common/Header.jsx';
import { getLoginState, getProductDetails, getAddToCartLoading, getAddToCartErrorMsg, getAddProductErrorMsg } from './../../selectors/app';
import { logout as logoutRequest, fetchProductDetails as fetchProductDetailsRequest,
	addToCart as addToCartRequest} from './../../actions/app';
import "../../../styles/productDetails.scss";
import { Link } from "react-router-dom";

function ProductDetails(props) {
	const navigate = useNavigate();
	const params = useParams();
	const { isLoggedIn, logout, fetchProductDetails, productDetails, addToCart, addToCartLoading, addToCartErrorMsg } = props;
	const { name, price, description, addedToCart } = productDetails;
	
	useEffect(() => {
		const data = {
			productId: atob(params.productid),
			userId: localStorage.getItem("userId")
		};

		fetchProductDetails(data);
	}, []);

	const addToCartFn = () => {
		const data = {
			userData : {
				productId: atob(params.productid),
				userId: localStorage.getItem("userId")
			},
			navigate
		};

		addToCart(data);
	}

	return (
		<div id="productDetailsPage">
			<Header
				isLoggedIn={isLoggedIn}
				logout={logout}
			/>
			<div className="container">
				<div className="row">
					<div className="product-details-wrapper">
						<div className="product-img">
							<div>
								<img src="https://img.favpng.com/8/17/0/product-design-clip-art-logo-food-png-favpng-TsCQEsJH2LUYN3d5Q6RzrTsqL.jpg" />
							</div>
						</div>
						<div className="product-details-box">
							<div className="product-name">{name}</div>
							<div className="product-price">&#8377; {price}</div>
							<div className="product-description">
								<div className="product-description-title">Description</div>
								<div className="product-description-data">{description}</div>
							</div>
							{
								addedToCart == 1 ? (
									<Link
										className="product-details-action btn btn-primary"
										to={"/cart"}
									>
										Go To Cart
									</Link>
								) : (
									<div
										className="product-details-action btn btn-primary"
										onClick={addToCartFn}
										disabled={addToCartLoading}
									>
										Add To Cart
									</div>
								)
							}
							<div className="add-to-cart-error-msg">{addToCartErrorMsg}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const mapDispatchToProps = (dispatch) => ({
	logout: () => dispatch(logoutRequest()),
	fetchProductDetails: (data) => dispatch(fetchProductDetailsRequest(data)),
	addToCart: (data) => dispatch(addToCartRequest(data))
});

const mapStateToProps = createStructuredSelector({
	isLoggedIn: getLoginState(),
	productDetails: getProductDetails(),
	addToCartLoading: getAddToCartLoading(),
	addToCartErrorMsg: getAddToCartErrorMsg()
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);