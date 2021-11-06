import React from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Header from '../../components/Common/Header.jsx';
import CategoryList from '../../components/Home/CategoryList.jsx';
import LoginWrapper from '../../components/Home/LoginWrapper.jsx';
import { getLoginState, getAuthErrorMsg, getCategoryList } from './../../selectors/app';
import { login as loginRequest, signup as signupRequest, logout as logoutRequest,
	fetchCategories as fetchCategoriesRequest, updateAuthErrorMsg as updateAuthErrorMsgRequest } from './../../actions/app';
import "../../../styles/home.scss";

function Home(props) {
	const { login, signup, isLoggedIn, authErrorMsg, logout, fetchCategories, categoryList, updateAuthErrorMsg } = props;

	return (
		<div id="homePage">
			<Header
				isLoggedIn={isLoggedIn}
				logout={logout}
			/>
			<div className="container">
				<div className="row">
					<h2 className="home-title text-center">Welcome to Ecommerce</h2>
					{
						isLoggedIn ? (
							<CategoryList
								fetchCategories={fetchCategories}
								categoryList={categoryList}
							/>
						) : (
							<LoginWrapper
								login={login}
								signup={signup}
								authErrorMsg={authErrorMsg}
								updateAuthErrorMsg={updateAuthErrorMsg}
							/>
						)
					}
				</div>
			</div>
		</div>
	)
}

const mapDispatchToProps = (dispatch) => ({
	login: (data) => dispatch(loginRequest(data)),
	signup: (data) => dispatch(signupRequest(data)),
	logout: () => dispatch(logoutRequest()),
	fetchCategories: () => dispatch(fetchCategoriesRequest()),
	updateAuthErrorMsg: (data) => dispatch(updateAuthErrorMsgRequest(data))
});

const mapStateToProps = createStructuredSelector({
	isLoggedIn: getLoginState(),
	authErrorMsg: getAuthErrorMsg(),
	categoryList: getCategoryList()
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);