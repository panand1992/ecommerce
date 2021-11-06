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

export const getAddToCartLoading = () => createSelector(selectApp, (appState) => appState.get('addToCartLoading'));

export const getAddToCartErrorMsg = () => createSelector(selectApp, (appState) => appState.get('addToCartErrorMsg'));

export const getOrderDetails = () => createSelector(selectApp, (appState) => appState.get('orderDetails').toJS());

export const getConfirmPaymentLoading = () => createSelector(selectApp, (appState) => appState.get('confirmPaymentLoading'));

export const getConfirmPaymentErrorMsg = () => createSelector(selectApp, (appState) => appState.get('confirmPaymentErrorMsg'));

export const getConfirmPaymentSuccess = () => createSelector(selectApp, (appState) => appState.get('confirmPaymentSuccess'));

export const getVendorPayments = () => createSelector(selectApp, (appState) => appState.get('vendorPayments').toJS());