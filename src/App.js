import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shoppage/shop.components";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-sign-out/sign-in-sign-out.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			currentUser: null,
		};
	}

	unsubscribeFromAuth = null;

	componentDidMount() {
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);
				userRef.onSnapshot((snapShot) => {
					this.setState(
						{
							currentUser: { id: snapShot.id, ...snapShot.data() },
						},
						console.log(this.state)
					);
				});
			} else {
                this.setState({currentUser: userAuth})
            }
			// createUserProfileDocument(user)
			// this.setState({ currentUser: user });
			// console.log(user)
		});
	}

	componentWillUnmount() {
		this.unsubscribeFromAuth();
	}

	render() {
		return (
			<div>
				<Header currentUser={this.state.currentUser} />
				<Switch>
					<Route exact path='/'>
						<HomePage />
					</Route>
					<Route exact path='/shop'>
						<ShopPage />
					</Route>
					<Route exact path='/signin'>
						<SignInAndSignUpPage />
					</Route>
				</Switch>
			</div>
		);
	}
}

export default App;
