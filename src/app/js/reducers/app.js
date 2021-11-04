import {
	fromJS
} from 'immutable';
import { SET_LOGIN_STATE } from './../constants/app';

const initialState = fromJS({
	isLoggedIn: localStorage.getItem('userID') !== null
});

const AppReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_LOGIN_STATE:
			return state
				.set('isLoggedIn', fromJS(action.data));
		default:
			return state;
	}
};

export default AppReducer;