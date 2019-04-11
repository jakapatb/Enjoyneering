import firebase from "../configs/firebase";
import { hist } from "../index.js";
import {
  FETCH_USER_FAIL,
  FETCH_USER_SUCCESS,
  FETCH_NOTI_SUCCESS
} from "../configs/constants";
const db = firebase.firestore();

export const getImgfromStorage = (postId, fileName) => {
  return new Promise((resolve, reject) => {
    firebase
      .storage()
      .ref("posts")
      .child(postId + "/" + fileName)
      .getDownloadURL()
      .then(url => {
        return resolve(url);
      })
      .catch(e => console.warn(e));
  });
};

export const getUserFromUid = uid =>
  new Promise((resolve, reject) =>
    db
      .collection("users")
      .doc(uid)
      .get()
      .then((userRef) => {
        return resolve(userRef.data());
      })
      .catch(error => {
        console.log(error);
        return reject({
          displayName: "?????"
        });
      })
  );

//direct to /search
export const goToSearch = word => {
  hist.push("/search?s=" + word);
};


export const checkAuth = (dispatch) => new Promise((resolve, reject) => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      const dataUser = user.providerData[0];
      var payload = {
        displayName: dataUser.displayName,
        uid: user.uid,
        photoURL: dataUser.photoURL,
      };
      const userRef = db.collection("users").doc(user.uid);
      db.runTransaction(transaction => {
        transaction.get(userRef).then(userDoc => {
          dispatch({
            type: FETCH_USER_SUCCESS,
            payload: payload,
            status: userDoc.data().status
          });
          transaction.update(userRef, payload);
        });
      });
      //notifications
      userRef.collection("notifications")
        .orderBy("date", "desc")
        .limit(5)
        .onSnapshot(notiSnap => {
          var notifications = [];
          notiSnap.forEach(noti =>
            notifications.push({ ...noti.data(), notiId: noti.id })
          );
          dispatch({ type: FETCH_NOTI_SUCCESS, payload: notifications });
          return resolve("SUSSES");
        });
    } else {
      dispatch({ type: FETCH_USER_FAIL });
      return resolve("Pleas Login");
    }
  });
});

export const generatePassword= () => {
  var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}
