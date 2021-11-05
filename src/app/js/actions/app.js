import { USER_LOGIN, USER_SIGNUP, SET_LOGIN_STATE, FETCH_CATEGORIES } from './../constants/app';

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
})