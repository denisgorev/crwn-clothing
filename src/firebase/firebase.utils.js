import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
require('dotenv').config()

const config = {
	apiKey: "AIzaSyDaekJDRLK16vp-_gnXub4j5Emct-xoFNY",
	authDomain: "crwn-project-b9c1b.firebaseapp.com",
	databaseURL: "https://crwn-project-b9c1b.firebaseio.com",
	projectId: "crwn-project-b9c1b",
	storageBucket: "crwn-project-b9c1b.appspot.com",
	messagingSenderId: "862357976871",
	appId: "1:862357976871:web:9ca5c637833f266a7c5b02",
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);
    // console.log(userRef);
	const snapShot = await userRef.get();
	// console.log(snapShot);

	if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        // console.log(userAuth)
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName: displayName,
				email: email,
				createdAt: createdAt,
				...additionalData
			});
		} catch (err) {
			console.log(err.message);
		}
	}

	return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ propmt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);
// console.log(provider)

export default firebase;
