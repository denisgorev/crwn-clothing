import React from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shoppage/shop.components";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-sign-out/sign-in-sign-out.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";

class App extends React.Component {
	// constructor() {
	// 	super();
	// 	this.state = {
	// 		currentUser: null,
	// 	};
	// }

	unsubscribeFromAuth = null;

	componentDidMount() {
		const { setCurrentUser } = this.props;
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);
				userRef.onSnapshot((snapShot) => {
					setCurrentUser({ id: snapShot.id, ...snapShot.data() });
				});
			} else {
				setCurrentUser(userAuth);
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
				<Header />
				<Switch>
					<Route exact path='/'>
						<HomePage />
					</Route>
					<Route exact path='/shop'>
						<ShopPage />
					</Route>
					<Route
						exact
						path='/signin'
						render={() => (this.props.currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />)}
					/>
				</Switch>
			</div>
		);
	}
}

const mapStateToProps = ({ user }) => ({
	currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
	setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
