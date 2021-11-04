import { USER_LOGIN } from './../constants/app';

export const userLogin = (data) => ({
	type: USER_LOGIN,
	data
});