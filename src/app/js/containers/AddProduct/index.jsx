import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Header from '../../components/Common/Header.jsx';
import Sidebar from "../../components/VendorHome/Sidebar.jsx";
import { getAddProductLoading, getAddProductSuccess, getCategoryList, getLoginState,
	getAddProductErrorMsg } from './../../selectors/app';
import {
	logout as logoutRequest, addProduct as addProductRequest,
	fetchCategories as fetchCategoriesRequest
} from './../../actions/app';
import "../../../styles/addProduct.scss";

function AddProduct(props) {
	const { isLoggedIn, logout, addProductLoading, addProduct, addProductSuccess, categoryList,
		fetchCategories, addProductErrorMsg } = props;
	const [productName, setProductName] = useState('');
	const [productPrice, setProductPrice] = useState('');
	const [productDescription, setProductDescription] = useState('');
	const [productCategory, setProductCategory] = useState('');

	useEffect(() => {
		fetchCategories();
	}, []);

	const addProductFn = () => {
		if (productName === "") {
			alert("product name empty");
		} else if (productPrice === "") {
			alert("product price empty");
		} else if (productDescription === "") {
			alert("product description empty");
		} else {
			const data = {
				name: productName,
				price: productPrice,
				description: productDescription,
				categoryId: productCategory,
				vendorId: localStorage.getItem('userId')
			};

			addProduct(data);
		}
	}

	const updateName = (e) => {
		setProductName(e.target.value);
	}

	const updatePrice = (e) => {
		setProductPrice(e.target.value);
	}

	const updateDescription = (e) => {
		setProductDescription(e.target.value);
	}

	const updateCategory = (e) => {
		setProductCategory(e.target.value);
	}

	return (
		<div id="addProductPage">
			<Header
				isLoggedIn={isLoggedIn}
				logout={logout}
			/>
			<div className="container">
				<div className="row">
					<div className="add-product-wrapper">
						<Sidebar activeTab="addProduct" />
						<div className="add-product-box">
							<div className="add-product-title">Add Product</div>
							<div className="form-group">
								<select className="form-select" onChange={updateCategory}>
									<option>Select Category</option>
									{
										categoryList.length > 0 && categoryList.map((category) => (
											<option
												key={category.categoryId}
												value={category.categoryId}
											>
												{category.name}
											</option>
										))
									}
								</select>
							</div>
							<div className="form-group">
								<input
									type="text"
									className="form-control"
									placeholder="Product Name"
									value={productName}
									onChange={updateName}
								/>
							</div>
							<div className="form-group">
								<input
									type="text"
									className="form-control"
									placeholder="Price"
									value={productPrice}
									onChange={updatePrice}
								/>
							</div>
							<div className="form-group">
								<textarea
									className="form-control"
									placeholder="Description"
									value={productDescription}
									onChange={updateDescription}
								/>
							</div>
							<div className="form-group">
								<input
									type="submit"
									className="form-control btn btn-primary"
									value="Add Product"
									onClick={addProductFn}
									disabled={addProductLoading}
								/>
							</div>
							{
								addProductSuccess && (
									<div className="add-product-success-msg">Product added Successfully</div>
								)
							}
							{
								addProductErrorMsg && (
									<div className="add-product-error-msg">{addProductErrorMsg}</div>
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
	addProduct: (data) => dispatch(addProductRequest(data)),
	fetchCategories: () => dispatch(fetchCategoriesRequest())
});

const mapStateToProps = createStructuredSelector({
	isLoggedIn: getLoginState(),
	addProductLoading: getAddProductLoading(),
	addProductSuccess: getAddProductSuccess(),
	addProductErrorMsg: getAddProductErrorMsg(),
	categoryList: getCategoryList()
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);