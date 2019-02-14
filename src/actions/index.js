import {
  FETCH_USER,
  FETCH_USER_FAIL,
  FETCH_USER_SUCCESS,
  FETCH_LIST_POPULAR,
  FETCH_LIST_RECENT,
  FETCH_POST,
  FETCH_POST_SUCCESS,
  FETCH_POST_CLEAR,
  FETCH_POST_ADD_COMMENT,
  FETCH_NOTI_SUCCESS
} from "../configs/constants";
import firebase from "../configs/firebase";
import { hist } from "../index.js";
import { getImgfromStorage, getUserFromUid } from "./helpers";
const db = firebase.firestore();

/**
 *!Lost Functions
 *! 1.
 */

export const checkStateUser = () => (dispatch, getState) => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      const dataUser = user.providerData[0];
      const payload = {
        displayName: dataUser.displayName,
        uid: user.uid,
        photoURL: dataUser.photoURL
      };
      const userRef = db.collection("users").doc(user.uid);
      userRef.set(payload);
      //notifications
      userRef.collection("notifications").onSnapshot(notiSnap => {
        var notifications = [];
        notiSnap.forEach(noti =>
          notifications.push({ ...noti.data(), notiId: noti.id })
        );
        dispatch({ type: FETCH_NOTI_SUCCESS, payload: notifications });
      });
      dispatch({ type: FETCH_USER_SUCCESS, payload: payload });
    } else {
      dispatch({ type: FETCH_USER_FAIL });
    }
  });
};

// mark seen in notifications
export const markSeenNoti = (postId, notiId) => (dispatch, getState) => {
  const { auth } = getState();
  var batch = db.batch();
  const uid = auth.data.uid;
  const notiRef = db
    .collection("users")
    .doc(uid)
    .collection("notifications")
    .doc(notiId);
  batch.update(notiRef, { seen: true });
  batch.commit().then(() => hist.push("/landing-page?post=" + postId));
};

//SignOut and delete from store
export const signOut = () => dispatch => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({ type: FETCH_USER });
    });
};

// * list Post
// Popular List posts
export const fetchListPopPost = () => dispatch => {
  var listPopPost = [];
  db.collection("posts")
    .orderBy("love_count")
    .limit(5)
    .get()
    .then(snapPosts => {
      snapPosts.forEach(post => {
        listPopPost.push({ ...post.data(), id: post.id });
      });
      dispatch({
        type: FETCH_LIST_POPULAR,
        popular: listPopPost,
        hasPop: true
      });
    });
};

// Recent List posts
export const fetchListPost = () => dispatch => {
  var listRecentPost = [];
  db.collection("posts")
    .orderBy("date")
    .limit(5)
    .get()
    .then(snapPosts => {
      snapPosts.forEach(post => {
        listRecentPost.push({ ...post.data(), id: post.id });
      });
      dispatch({
        type: FETCH_LIST_RECENT,
        recent: listRecentPost,
        hasRecent: true
      });
    });
};

// * Post

//Send Comment
export const sendComment = comment => (dispatch, getState) => {
  const { post } = getState();
  const commentsRef = db.collection("posts").doc(post.data.id);
  commentsRef.collection("comments").add(comment);
};

// fetch Post when coming to Post.
export const fetchPost = postId => dispatch => {
  dispatch({ type: FETCH_POST });
  const postRef = db.collection("posts").doc(postId);
  postRef.get().then(post => {
    postRef
      .collection("contents")
      .get()
      .then(contentsRef => {
        var contents = [];
        contentsRef.forEach(content =>
          contents.push({ ...content.data(), id: content.id })
        );
        getImgfromStorage(postId, "title.jpg").then(imgUrl =>
          getUserFromUid(post.data().ownerUid).then(owner =>
            dispatch({
              type: FETCH_POST_SUCCESS,
              payload: {
                ...post.data(),
                id: post.id,
                imgUrl: imgUrl,
                owner: owner,
                contents: contents
              }
            })
          )
        );
      });
  });

  //fetch Comments
  postRef.collection("comments").onSnapshot(snap => {
    var comments = {};
    snap.forEach(comment => {
      comments = { ...comments, [comment.id]: comment.data() };
    });
    dispatch({ type: FETCH_POST_ADD_COMMENT, payload: comments });
  });
};

//Clear data when exit this Post.
export const clearPost = () => dispatch => {
  dispatch({ type: FETCH_POST_CLEAR });
};

//กดLove / อันLove
export const pressLove = isLove => (dispatch, getState) => {
  const { post, auth } = getState();
  const postId = post.data.id;
  const uid = auth.data.uid;
  const postRef = db.collection("posts").doc(postId);
  db.runTransaction(transaction => {
    return transaction.get(postRef).then(postDoc => {
      var love = postDoc.data().love;
      if (isLove) {
        love.push(uid);
      } else {
        love = love.filter(userInLove => {
          return userInLove !== uid;
        });
      }
      const love_count = love.length;
      transaction.update(postRef, {
        love_count: love_count,
        love: love
      });
    });
  });
};
