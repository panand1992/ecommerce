import { createSelector } from 'reselect';
const selectApp = (state) => state;

export const getLoginState = () => createSelector(selectApp, (appState) => appState.get('isLoggedIn'));

export const getUsername = () => createSelector(selectApp, (appState) => appState.get('username'));

export const getAuthErrorMsg = () => createSelector(selectApp, (appState) => appState.get('authErrorMsg'));

export const getCategoryList = () => createSelector(selectApp, (appState) => appState.get('categoryList').toJS());