import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from './pages/shoppage/shop.components'


function App() {
	return (
		<Switch>
			<Route exact path='/'>
				<HomePage />
			</Route>
			<Route exact path='/shop'>
				<ShopPage />
			</Route>
		</Switch>
	);
}

export default App;
