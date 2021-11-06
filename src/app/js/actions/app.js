import { USER_LOGIN, USER_SIGNUP, SET_LOGIN_STATE, FETCH_CATEGORIES, FETCH_PRODUCTS,
	FETCH_PRODUCT_DETAILS, FETCH_VENDOR_DETAILS, ADD_PRODUCT } from './../constants/app';

export const login = (data) => ({
	type: USER_LOGIN,
	data
});

export const signup = (data) => ({
	type: USER_SIGNUP,
	data
});

export const logout = () => ({
	type: SET_LOGIN_STATE,
	data: false,
});

export const fetchCategories = () => ({
	type: FETCH_CATEGORIES
});

export const fetchProducts = (data) => ({
	type: FETCH_PRODUCTS,
	data
});

export const fetchProductDetails = (data) => ({
	type: FETCH_PRODUCT_DETAILS,
	data
});

export const fetchVendorDetails = (data) => ({
	type: FETCH_VENDOR_DETAILS,
	data
});

export const addProduct = (data) => ({
	type: ADD_PRODUCT,
	data
});
