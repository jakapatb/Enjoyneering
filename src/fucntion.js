import {
    FETCH_USER,
    FETCH_USER_FAIL,
    FETCH_USER_SUCCESS
} from "../configs/constants";

import firebase from "../configs/firebase";

export const signinWithGoogle = () => {
    return dispatch => {
        dispatch({ type: FETCH_USER });
        withGoogle()
            .then(data => {
                dispatch({ type: FETCH_USER_SUCCESS, payload: data });
            })
            .catch(err => {
                dispatch({ type: FETCH_USER_FAIL, error: err });
            });
    };
};

const withGoogle = () => {
    return new Promise((resolve, reject) => {
        var provider = new firebase.auth.GoogleAuthProvider();
        const data = firebase.auth().signInWithPopup(provider);
        return resolve(data);
        /* .then(result => {
            var token = result.credential.accessToken;
            var user = result.user;
            console.log(user);
            return resolve({ token: token, user: user });
          })
          .catch(err => {
            console.log(err);
            return reject(err);
          }); */
    });
};

export const checkStateUser = () => {
    return dispatch => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                const dataUser = user.providerData[0];
                const payload = {
                    displayName: dataUser.displayName,
                    uid: user.uid,
                    photoURL: dataUser.photoURL
                };
                firebase
                    .firestore()
                    .collection("users")
                    .doc(user.uid)
                    .set(payload);
                dispatch({ type: FETCH_USER_SUCCESS, payload: payload });
            } else {
                dispatch({ type: FETCH_USER_FAIL });
            }
        });
    };
};

export const signOut = () => {
    return dispatch => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                dispatch({ type: FETCH_USER });
            });
    };
};
