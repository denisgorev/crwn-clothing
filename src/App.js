import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";

const HatsPage = () => <h1>HatsPage</h1>;
function App() {
	return (
		<Switch>
			<Route exact path='/'>
				<HomePage />
			</Route>
			<Route exact path='/shop/hats'>
				<HatsPage />
			</Route>
		</Switch>
	);
}

export default App;
