import React, { useEffect, useMemo, useState } from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useLocation, useNavigate } from "react-router";

import Header from '../../components/Common/Header.jsx';
import Sidebar from "../../components/ProductList/Sidebar.jsx";
import ProductItem from "../../components/ProductList/ProductItem.jsx";
import { getLoginState, getProductList, getCategoryList } from './../../selectors/app';
import { fetchCategories as fetchCategoriesRequest, fetchProducts as fetchProductsRequest,
	logout as logoutRequest } from './../../actions/app';
import "../../../styles/productList.scss";

function useQuery() {
	const { search } = useLocation();
  
	return useMemo(() => new URLSearchParams(search), [search]);
}

function ProductList(props) {
	const navigate = useNavigate();
	const { fetchCategories, categoryList, isLoggedIn, logout, productList, fetchProducts } = props;
	const [categoryName, setCategoryName] = useState('');
	const currentCategoryData = useQuery();
	const currentCategory = atob(currentCategoryData.get('categoryId'));

    useEffect(() => {
		const data = {};
		if(categoryList.length === 0) {
			fetchCategories();
		}

		if(currentCategoryData.get('categoryId')) {
			data.categoryId = currentCategory;
		}	

        fetchProducts(data);
    }, [currentCategory]);

	useEffect(() => {
		if(categoryList.length > 0) {
			const currentObj = categoryList.find(item => {
				return item.categoryId == currentCategory
			});

			if(currentObj) {
				setCategoryName(currentObj.name);
			}
		}
	}, [categoryList, currentCategory]);

	const clearFilter = () => {
		const data = {};
		setCategoryName('');
		fetchProducts(data);
		navigate('/products', { replace: false });
	}

	const searchProduct = (val) => {
		const data = {
			query: val
		};

		if(currentCategoryData.get('categoryId')) {
			data.categoryId = currentCategory;
		}
	
        fetchProducts(data);
	}

	const filterProduct = (minPrice, maxPrice, searchQuery) => {
		const data = {
			query: searchQuery,
			minPrice,
			maxPrice,
		};

		if(currentCategoryData.get('categoryId')) {
			data.categoryId = currentCategory;
		}
	
        fetchProducts(data);
	}

	return (
		<div id="productListPage">
			<Header
				isLoggedIn={isLoggedIn}
				logout={logout}
			/>
			<div className="container">
				<div className="row">
					<h2 className="product-list-title text-center">
						{categoryName ? categoryName : 'All Products'}
					</h2>
					<div className="product-list-wrapper">
						<Sidebar
							categoryList={categoryList}
							currentCategory={currentCategory}
							clearFilter={clearFilter}
							searchProduct={searchProduct}
							filterProduct={filterProduct}
						/>
						<div className="product-list-box">
							{
								productList.length > 0 ? productList.map((product) => (
									<ProductItem
										key={product.productId}
										productName={product.name}
										price={product.price}
										productId={product.productId}
									/>
								)) : (
									<div className="no-product">No Product Found</div>
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
	fetchCategories: () => dispatch(fetchCategoriesRequest()),
	fetchProducts: (data) => dispatch(fetchProductsRequest(data)),
});

const mapStateToProps = createStructuredSelector({
	isLoggedIn: getLoginState(),
	productList: getProductList(),
	categoryList: getCategoryList()
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);