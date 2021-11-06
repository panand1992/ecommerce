import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useParams } from "react-router";

import Header from '../../components/Common/Header.jsx';
import { getLoginState, getProductDetails } from './../../selectors/app';
import { logout as logoutRequest, fetchProductDetails as fetchProductDetailsRequest} from './../../actions/app';
import "../../../styles/home.scss";

function ProductDetails(props) {
	const { isLoggedIn, logout, fetchProductDetails, productDetails } = props;
	const params = useParams();
	
	useEffect(() => {
		const data = {
			productId: atob(params.productid)
		};

		fetchProductDetails(data);
	}, []);

	return (
		<div id="productDetailsPage">
			<Header
				isLoggedIn={isLoggedIn}
				logout={logout}
			/>
			<div className="container">
				<div className="row">
					
				</div>
			</div>
		</div>
	)
}

const mapDispatchToProps = (dispatch) => ({
	logout: () => dispatch(logoutRequest()),
	fetchProductDetails: (data) => dispatch(fetchProductDetailsRequest(data))
});

const mapStateToProps = createStructuredSelector({
	isLoggedIn: getLoginState(),
	productDetails: getProductDetails()
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);