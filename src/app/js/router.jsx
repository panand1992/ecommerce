import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./containers/Home/index.jsx"));

function Customrouter() {
	return (
		<Router>
			<Suspense fallback={<div className="loader"></div>}>
				<Routes>
					<Route exact path="/" element={<Home />} />
				</Routes>
			</Suspense>
		</Router>
	);
}

export default Customrouter;