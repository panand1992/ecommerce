import { takeLatest, all, put } from 'redux-saga/effects';
import { USER_LOGIN, SET_LOGIN_STATE, USER_SIGNUP, SET_AUTH_ERROR_MSG, FETCH_CATEGORIES, SET_CATEGORY_LIST } from './../constants/app';

function* userLogin(action) {
	const { data } = action;
	try {
		const responseBody = yield fetch("/api/v1/user/login", {
			method: 'POST',
			headers: {
				"Content-Type": "application/json;charset=UTF-8"
			},
			body: JSON.stringify(data)
		});
		const result = yield responseBody.json();
		if(result.success) {
			localStorage.setItem('userId', result.data.userId);
			localStorage.setItem('username', result.data.username);
			localStorage.setItem('userType', result.data.userType);
			yield put({ type: SET_AUTH_ERROR_MSG, data: '' });
		} else {
			yield put({ type: SET_AUTH_ERROR_MSG, data: result.msg });
		}
		yield put({ type: SET_LOGIN_STATE, data: result.success });
	} catch (e) {
		yield put({ type: SET_LOGIN_STATE, data: false });
		yield put({ type: SET_AUTH_ERROR_MSG, data: 'Error in Login' });
		console.log(e);
	}
}

function* userSignup(action) {
	const { data } = action;
	try {
		const responseBody = yield fetch("/api/v1/user/signup", {
			method: 'POST',
			headers: {
				"Content-Type": "application/json;charset=UTF-8"
			},
			body: JSON.stringify(data)
		});
		const result = yield responseBody.json();
		yield put({ type: SET_LOGIN_STATE, data: result.success });
		if(result.success) {
			localStorage.setItem('userId', result.userId);
			localStorage.setItem('username', result.username);
			localStorage.setItem('userType', result.userType);
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
		if(result.success) {
			yield put({ type: SET_CATEGORY_LIST, data: result.categories });
		} else {
			yield put({ type: SET_CATEGORY_LIST, data: [] });
		}
	} catch (e) {
		console.log(e);
	}
}

export default function* appSaga() {
    yield all([yield takeLatest(USER_LOGIN, userLogin)]);
	yield all([yield takeLatest(USER_SIGNUP, userSignup)]);
	yield all([yield takeLatest(FETCH_CATEGORIES, fetchCategories)]);
}
