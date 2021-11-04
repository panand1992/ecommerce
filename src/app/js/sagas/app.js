import { takeLatest, all, put } from 'redux-saga/effects';
import { USER_LOGIN, SET_LOGIN_STATE } from './../constants/app';

function* userLogin(action) {
	const { data } = action;
	try {
		const responseBody = yield fetch("/api/v1/login", {
			method: 'POST',
			headers: {
				"Content-Type": "application/json;charset=UTF-8"
			},
			body: JSON.stringify(data)
		});
		const result = yield responseBody.json();
		localStorage.setItem('userID', result.userId);
		yield put({ type: SET_LOGIN_STATE, data: result.success });
	} catch (e) {
		console.log(e);
	}
}

export default function* appSaga() {
    yield all([yield takeLatest(USER_LOGIN, userLogin)]);
}
