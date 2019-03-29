import firebase from "../configs/firebase";
import { hist } from "../index.js";
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

