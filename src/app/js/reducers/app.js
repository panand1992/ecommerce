import {
	fromJS
} from 'immutable';
import {
	SET_AUTH_ERROR_MSG,
	SET_LOGIN_STATE,
	SET_CATEGORY_LIST,
	SET_PRODUCT_LIST,
	SET_PRODUCT_DETAILS,
	SET_VENDOR_DETAILS,
	SET_ADD_PRODUCT_SUCCESS,
	SET_ADD_PRODUCT_LOADING,
	SET_ADD_PRODUCT_ERROR_MSG
} from './../constants/app';

const initialState = fromJS({
	isLoggedIn: localStorage.getItem('userId') !== null,
	authErrorMsg: '',
	categoryList: [],
	productList: [],
	productDetails: {},
	vendorDetails: {},
	addProductLoading: false,
	addProductSuccess: false,
	addProductErrorMsg: ''
});

const AppReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_LOGIN_STATE:
			return state
				.set('isLoggedIn', fromJS(action.data));
		case SET_AUTH_ERROR_MSG:
			return state
				.set('authErrorMsg', fromJS(action.data));
		case SET_CATEGORY_LIST:
			return state
				.set('categoryList', fromJS(action.data));
		case SET_PRODUCT_LIST:
			return state
				.set('productList', fromJS(action.data));
		case SET_PRODUCT_DETAILS:
			return state
				.set('productDetails', fromJS(action.data));
		case SET_VENDOR_DETAILS:
			return state
				.set('vendorDetails', fromJS(action.data));
		case SET_ADD_PRODUCT_LOADING:
			return state
				.set('addProductLoading', fromJS(action.data));
		case SET_ADD_PRODUCT_SUCCESS:
			return state
				.set('addProductSuccess', fromJS(action.data));
		case SET_ADD_PRODUCT_ERROR_MSG:
			return state
				.set('addProductErrorMsg', fromJS(action.data));
		default:
			return state;
	}
};

export default AppReducer;