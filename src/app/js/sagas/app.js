import { takeLatest, all, put } from 'redux-saga/effects';
import {
	USER_LOGIN, SET_LOGIN_STATE, USER_SIGNUP, SET_AUTH_ERROR_MSG, FETCH_CATEGORIES,
	SET_CATEGORY_LIST, FETCH_PRODUCTS, FETCH_PRODUCT_DETAILS, SET_PRODUCT_LIST, SET_PRODUCT_DETAILS,
	FETCH_VENDOR_DETAILS, SET_VENDOR_DETAILS, ADD_PRODUCT, SET_ADD_PRODUCT_LOADING,
	SET_ADD_PRODUCT_SUCCESS, SET_ADD_PRODUCT_ERROR_MSG, ADD_TO_CART, SET_ADD_TO_CART_LOADING,
	SET_ADD_TO_CART_ERROR_MSG, FETCH_ORDER_DETAILS, SET_ORDER_DETAILS, EDIT_ORDER, SET_CONFIRM_PAYMENT_LOADING,
	SET_CONFIRM_PAYMENT_SUCCESS, SET_CONFIRM_PAYMENT_ERROR_MSG, FETCH_VENDOR_PAYMENTS, SET_VENDOR_PAYMENTS
} from './../constants/app';

function* userLogin(action) {
	const { data } = action;
	const { userData, navigate } = data;
	yield put({ type: SET_AUTH_ERROR_MSG, data: '' });
	try {
		const responseBody = yield fetch("/api/v1/user/login", {
			method: 'POST',
			headers: {
				"Content-Type": "application/json;charset=UTF-8"
			},
			body: JSON.stringify(userData)
		});
		const result = yield responseBody.json();
		yield put({ type: SET_LOGIN_STATE, data: result.success });
		if (result.success) {
			localStorage.setItem('userId', result.data.userId);
			localStorage.setItem('username', result.data.username);
			localStorage.setItem('userType', result.data.userType);
			if (result.data.userType == 2) {
				navigate('/vendor', { replace: false });
			}
			yield put({ type: SET_AUTH_ERROR_MSG, data: '' });
		} else {
			yield put({ type: SET_AUTH_ERROR_MSG, data: result.msg });
		}
	} catch (e) {
		yield put({ type: SET_LOGIN_STATE, data: false });
		yield put({ type: SET_AUTH_ERROR_MSG, data: 'Error in Login' });
		console.log(e);
	}
}

function* userSignup(action) {
	const { data } = action;
	const { userData, navigate } = data;
	yield put({ type: SET_AUTH_ERROR_MSG, data: '' });
	try {
		const responseBody = yield fetch("/api/v1/user/signup", {
			method: 'POST',
			headers: {
				"Content-Type": "application/json;charset=UTF-8"
			},
			body: JSON.stringify(userData)
		});
		const result = yield responseBody.json();
		yield put({ type: SET_LOGIN_STATE, data: result.success });
		if (result.success) {
			localStorage.setItem('userId', result.data.userId);
			localStorage.setItem('username', result.data.username);
			localStorage.setItem('userType', result.data.userType);
			if (result.data.userType == 2) {
				navigate('/vendor', { replace: false });
			}
			yield put({ type: SET_AUTH_ERROR_MSG, data: '' });
		} else {
			yield put({ type: SET_AUTH_ERROR_MSG, data: result.msg });
		}
	} catch (e) {
		yield put({ type: SET_LOGIN_STATE, data: false });
		yield put({ type: SET_AUTH_ERROR_MSG, data: 'Error in Signup' });
		console.log(e);
	}
}

function* fetchCategories(action) {
	const { data } = action;
	try {
		const responseBody = yield fetch("/api/v1/category/all", {
			method: 'POST',
			headers: {
				"Content-Type": "application/json;charset=UTF-8"
			},
			body: JSON.stringify(data)
		});
		const result = yield responseBody.json();
		if (result.success) {
			yield put({ type: SET_CATEGORY_LIST, data: result.categories });
		} else {
			yield put({ type: SET_CATEGORY_LIST, data: [] });
		}
	} catch (e) {
		console.log(e);
	}
}

function* fetchProducts(action) {
	const { data } = action;
	try {
		const responseBody = yield fetch("/api/v1/product/all", {
			method: 'POST',
			headers: {
				"Content-Type": "application/json;charset=UTF-8"
			},
			body: JSON.stringify(data)
		});
		const result = yield responseBody.json();
		if (result.success) {
			yield put({ type: SET_PRODUCT_LIST, data: result.products });
		} else {
			if(result.status == 401 || result.status == 403){
				localStorage.removeItem('userId');
				localStorage.removeItem('username');
				localStorage.removeItem('userType');
				location.replace("/?logout=true");
			} else {
				yield put({ type: SET_PRODUCT_LIST, data: [] });
			}
		}
	} catch (e) {
		console.log(e);
	}
}

function* fetchProductDetails(action) {
	const { data } = action;
	try {
		const responseBody = yield fetch("/api/v1/product/details", {
			method: 'POST',
			headers: {
				"Content-Type": "application/json;charset=UTF-8"
			},
			body: JSON.stringify(data)
		});
		const result = yield responseBody.json();
		if (result.success) {
			yield put({ type: SET_PRODUCT_DETAILS, data: result.productDetails });
		} else {
			yield put({ type: SET_PRODUCT_DETAILS, data: {} });
		}
	} catch (e) {
		console.log(e);
	}
}

function* fetchVendorDetails(action) {
	const { data } = action;
	try {
		const responseBody = yield fetch("/api/v1/user/vendor/details", {
			method: 'POST',
			headers: {
				"Content-Type": "application/json;charset=UTF-8"
			},
			body: JSON.stringify(data)
		});
		const result = yield responseBody.json();
		if (result.success) {
			yield put({ type: SET_VENDOR_DETAILS, data: result.vendorDetails });
		} else {
			yield put({ type: SET_VENDOR_DETAILS, data: {} });
		}
	} catch (e) {
		console.log(e);
	}
}

function* addProduct(action) {
	const { data } = action;
	yield put({ type: SET_ADD_PRODUCT_LOADING, data: true });
	yield put({ type: SET_ADD_PRODUCT_SUCCESS, data: false });
	yield put({ type: SET_ADD_PRODUCT_ERROR_MSG, data: '' });
	try {
		const responseBody = yield fetch("/api/v1/product/add", {
			method: 'POST',
			headers: {
				"Content-Type": "application/json;charset=UTF-8"
			},
			body: JSON.stringify(data)
		});
		const result = yield responseBody.json();
		if (result.success) {
			yield put({ type: SET_ADD_PRODUCT_SUCCESS, data: true });
			yield put({ type: SET_ADD_PRODUCT_ERROR_MSG, data: '' });
		} else {
			yield put({ type: SET_ADD_PRODUCT_SUCCESS, data: false });
			yield put({ type: SET_ADD_PRODUCT_ERROR_MSG, data: result.msg });
		}
		yield put({ type: SET_ADD_PRODUCT_LOADING, data: false });
	} catch (e) {
		console.log(e);
		yield put({ type: SET_ADD_PRODUCT_LOADING, data: false });
		yield put({ type: SET_ADD_PRODUCT_SUCCESS, data: false });
		yield put({ type: SET_ADD_PRODUCT_ERROR_MSG, data: 'Error in adding product' });
	}
}

function* addToCart(action) {
	const { data } = action;
	const { userData, navigate } = data;
	yield put({ type: SET_ADD_TO_CART_LOADING, data: true });
	yield put({ type: SET_ADD_TO_CART_ERROR_MSG, data: '' });
	try {
		const responseBody = yield fetch("/api/v1/order/add", {
			method: 'POST',
			headers: {
				"Content-Type": "application/json;charset=UTF-8"
			},
			body: JSON.stringify(userData)
		});
		const result = yield responseBody.json();
		if (result.success) {
			yield put({ type: SET_ADD_TO_CART_ERROR_MSG, data: '' });
			navigate('/cart', { replace: false });
		} else {
			yield put({ type: SET_ADD_TO_CART_ERROR_MSG, data: result.msg });
		}
		yield put({ type: SET_ADD_TO_CART_LOADING, data: false });
	} catch (e) {
		console.log(e);
		yield put({ type: SET_ADD_TO_CART_LOADING, data: false });
		yield put({ type: SET_ADD_TO_CART_ERROR_MSG, data: 'Error in adding product to cart' });
	}
}

function* fetchOrderDetails(action) {
	const { data } = action;
	try {
		const responseBody = yield fetch("/api/v1/order/details", {
			method: 'POST',
			headers: {
				"Content-Type": "application/json;charset=UTF-8"
			},
			body: JSON.stringify(data)
		});
		const result = yield responseBody.json();
		if (result.success) {
			yield put({ type: SET_ORDER_DETAILS, data:  result.orderDetails ? result.orderDetails : {} });
		} else {
			yield put({ type: SET_ORDER_DETAILS, data: {} });
		}
	} catch (e) {
		console.log(e);
	}
}

function* editOrder(action) {
	const { data } = action;
	if (data.payment) {
		yield put({ type: SET_CONFIRM_PAYMENT_LOADING, data: true });
		yield put({ type: SET_CONFIRM_PAYMENT_SUCCESS, data: false });
		yield put({ type: SET_CONFIRM_PAYMENT_ERROR_MSG, data: '' });
	}
	try {
		const responseBody = yield fetch("/api/v1/order/edit", {
			method: 'POST',
			headers: {
				"Content-Type": "application/json;charset=UTF-8"
			},
			body: JSON.stringify(data)
		});
		const result = yield responseBody.json();
		if (result.success) {
			if (data.payment) {
				yield put({ type: SET_CONFIRM_PAYMENT_SUCCESS, data: true });
				yield put({ type: SET_CONFIRM_PAYMENT_ERROR_MSG, data: '' });
				yield put({ type: SET_CONFIRM_PAYMENT_LOADING, data: false });
			} else {
				yield put({ type: FETCH_ORDER_DETAILS, data: { userId: localStorage.getItem('userId') } })
			}
		} else {
			if(data.payment) {
				yield put({ type: SET_CONFIRM_PAYMENT_SUCCESS, data: false });
				yield put({ type: SET_CONFIRM_PAYMENT_ERROR_MSG, data: result.msg });
				yield put({ type: SET_CONFIRM_PAYMENT_LOADING, data: false });
			}
		}
	} catch (e) {
		console.log(e);
		if (data.payment) {
			yield put({ type: SET_CONFIRM_PAYMENT_LOADING, data: false });
			yield put({ type: SET_CONFIRM_PAYMENT_SUCCESS, data: false });
			yield put({ type: SET_CONFIRM_PAYMENT_ERROR_MSG, data: 'Error in confirming payment' });
		}
	}
}

function* fetchVendorPayments(action) {
	const { data } = action;
	try {
		const responseBody = yield fetch("/api/v1/user/vendor/payments", {
			method: 'POST',
			headers: {
				"Content-Type": "application/json;charset=UTF-8"
			},
			body: JSON.stringify(data)
		});
		const result = yield responseBody.json();
		if (result.success) {
			yield put({ type: SET_VENDOR_PAYMENTS, data: result.vendorPayments });
		} else {
			yield put({ type: SET_VENDOR_PAYMENTS, data: [] });
		}
	} catch (e) {
		console.log(e);
	}
}

export default function* appSaga() {
	yield all([yield takeLatest(USER_LOGIN, userLogin)]);
	yield all([yield takeLatest(USER_SIGNUP, userSignup)]);
	yield all([yield takeLatest(FETCH_CATEGORIES, fetchCategories)]);
	yield all([yield takeLatest(FETCH_PRODUCTS, fetchProducts)]);
	yield all([yield takeLatest(FETCH_PRODUCT_DETAILS, fetchProductDetails)]);
	yield all([yield takeLatest(FETCH_VENDOR_DETAILS, fetchVendorDetails)]);
	yield all([yield takeLatest(ADD_PRODUCT, addProduct)]);
	yield all([yield takeLatest(ADD_TO_CART, addToCart)]);
	yield all([yield takeLatest(FETCH_ORDER_DETAILS, fetchOrderDetails)]);
	yield all([yield takeLatest(EDIT_ORDER, editOrder)]);
	yield all([yield takeLatest(FETCH_VENDOR_PAYMENTS, fetchVendorPayments)]);
}
