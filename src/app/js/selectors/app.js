import { createSelector } from 'reselect';
const selectApp = (state) => state;

export const getLoginState = () => createSelector(selectApp, (appState) => appState.get('isLoggedIn'));