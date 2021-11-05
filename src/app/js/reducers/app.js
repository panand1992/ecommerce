import {
	fromJS
} from 'immutable';
import {
	SET_AUTH_ERROR_MSG,
	SET_LOGIN_STATE,
	SET_CATEGORY_LIST
} from './../constants/app';

const initialState = fromJS({
	isLoggedIn: localStorage.getItem('userId') !== null,
	username: localStorage.getItem('username'),
	authErrorMsg: '',
	categoryList: []
});

const AppReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_LOGIN_STATE:
			return state
				.set('isLoggedIn', toJS(action.data));
		case SET_AUTH_ERROR_MSG:
			return state
				.set('authErrorMsg', fromJS(action.data));
		case SET_CATEGORY_LIST:
			return state
				.set('categoryList', fromJS(action.data));
		default:
			return state;
	}
};

export default AppReducer;