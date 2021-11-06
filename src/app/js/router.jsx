import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const AddProduct = lazy(() => import("./containers/AddProduct/index.jsx"));
const Cart = lazy(() => import("./containers/Cart/index.jsx"));
const Checkout = lazy(() => import("./containers/Checkout/index.jsx"));
const Home = lazy(() => import("./containers/Home/index.jsx"));
const ProductDetails = lazy(() => import("./containers/ProductDetails/index.jsx"));
const ProductList = lazy(() => import("./containers/ProductList/index.jsx"));
const VendorDetails = lazy(() => import("./containers/VendorDetails/index.jsx"));
const VendorHome = lazy(() => import("./containers/VendorHome/index.jsx"));
const VendorPayments = lazy(() => import("./containers/VendorPayments/index.jsx"));

function Customrouter() {
	return (
		<Router>
			<Routes>
				<Route
					exact
					path="/"
					element={
						<Suspense fallback={<div className="loader"></div>}>
							<Home />
						</Suspense>
					}
				/>
				<Route
					exact
					path="/cart"
					element={
						<Suspense fallback={<div className="loader"></div>}>
							<Cart />
						</Suspense>
					}
				/>
				<Route
					exact
					path="/checkout"
					element={
						<Suspense fallback={<div className="loader"></div>}>
							<Checkout />
						</Suspense>
					}
				/>
				<Route
					exact
					path="/products"
					element={
						<Suspense fallback={<div className="loader"></div>}>
							<ProductList />
						</Suspense>
					}
				/>
				<Route
					exact
					path="/product/:productid/details"
					element={
						<Suspense fallback={<div className="loader"></div>}>
							<ProductDetails />
						</Suspense>
					}
				/>
				<Route
					exact
					path="/vendor"
					element={
						<Suspense fallback={<div className="loader"></div>}>
							<VendorHome />
						</Suspense>
					}
				/>
				<Route
					exact
					path="/vendor/details"
					element={
						<Suspense fallback={<div className="loader"></div>}>
							<VendorDetails />
						</Suspense>
					}
				/>
				<Route
					exact
					path="/vendor/payments"
					element={
						<Suspense fallback={<div className="loader"></div>}>
							<VendorPayments />
						</Suspense>
					}
				/>
				<Route
					exact
					path="/vendor/product/add"
					element={
						<Suspense fallback={<div className="loader"></div>}>
							<AddProduct />
						</Suspense>
					}
				/>
			</Routes>
		</Router>
	);
}

export default Customrouter;