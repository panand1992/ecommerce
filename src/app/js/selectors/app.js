import { createSelector } from 'reselect';
const selectApp = (state) => state;

export const getLoginState = () => createSelector(selectApp, (appState) => appState.get('isLoggedIn'));

export const getAuthErrorMsg = () => createSelector(selectApp, (appState) => appState.get('authErrorMsg'));

export const getCategoryList = () => createSelector(selectApp, (appState) => appState.get('categoryList').toJS());

export const getCurrentCategory = () => createSelector(selectApp, (appState) => appState.get('currentCategory'));

export const getProductList = () => createSelector(selectApp, (appState) => appState.get('productList').toJS());

export const getVendorDetails = () => createSelector(selectApp, (appState) => appState.get('vendorDetails').toJS());

export const getAddProductLoading = () => createSelector(selectApp, (appState) => appState.get('addProductLoading'));

export const getAddProductSuccess = () => createSelector(selectApp, (appState) => appState.get('addProductSuccess'));

export const getAddProductErrorMsg = () => createSelector(selectApp, (appState) => appState.get('addProductErrorMsg'));

export const getProductDetails = () => createSelector(selectApp, (appState) => appState.get('productDetails').toJS());