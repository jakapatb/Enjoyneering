import {
  FETCH_USER,
  FETCH_LIST_POPULAR,
  FETCH_LIST_RECENT,
  FETCH_LIST,
  FETCH_POST_ADD_COMMENT,
  FETCH_CONTENT,
  FETCH_CONTENT_CLEAR,
  FETCH_CONTENT_SUCCESS,
  FETCH_CONTENT_ADD_MODAL
} from "../configs/constants";
import firebase from "../configs/firebase";
import { hist } from "../index.js";
const db = firebase.firestore();

/**
 *!Lost Functions
 *! 1.
 */

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
  batch.commit().then(() => hist.push("/landing-page/" + postId));
};

//SignOut and delete from store
export const signOut = () => dispatch => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({ type: FETCH_USER });
    });
  hist.push("/login-page");
};

// * list Post
// Popular List posts
export const fetchListPopPost = () => (dispatch, getState) => {
  const { auth } = getState();
  var listPopPost = [];
  var postsRef = db.collection("posts");
  //! still bug
  if (!auth.isAuth) {
    postsRef = postsRef.where("public", "==", true);
  }
  postsRef
    .orderBy("love_count", "desc")
    .limit(5)
    .onSnapshot(snapPosts => {
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
export const fetchListPost = (listName, condition = { type: "recent" }) => (
  dispatch,
  getState
) => {
  dispatch({
    type: FETCH_LIST
  });
  const { auth } = getState();
  var postsRef = db.collection("posts");
  var listPost = [];
  if (!auth.isAuth || auth.status === "visitor") {
    //  visitor & notAuth only see public post
    postsRef = postsRef.where("public", "==", true);
  }

  // ! ใช้ไม่ได้ งงชิบ
  if (condition.type === "where") {
    postsRef = postsRef.where(
      condition.name,
      condition.operator,
      condition.value
    );
  } else {
    postsRef = postsRef.orderBy("date", "desc");
  }

  postsRef
    .limit(5)
    .get()
    .then(snapPosts => {
      snapPosts.forEach(post => {
        listPost.push({ ...post.data(), id: post.id });
      });
      dispatch({
        type: FETCH_LIST_RECENT,
        listName: listName,
        listPost: listPost,
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


//fetch Comments
export const fetchComments = postId => dispatch =>
  new Promise((resolve, reject) => {
    const commentsRef = db
      .collection("posts")
      .doc(postId)
      .collection("comments");
    commentsRef.onSnapshot(snap => {
      var comments = [];
      snap.forEach(comment => {
        comments.push({
          id: comment.id,
          content: comment.data()
        });
      });
      comments = comments.sort((a, b) => {
        return a.date - b.date;
      });
      dispatch({
        type: FETCH_POST_ADD_COMMENT,
        payload: comments
      });
      return resolve();
    });
  });

export const fetchSubComments = id => (dispatch, getState) =>
  new Promise((resolve, reject) => {
    const { post } = getState();
    if (post.hasPost) {
      db.collection("posts")
        .doc(post.id)
        .collection("comments")
        .doc(id)
        .collection("subComments")
        .onSnapshot(subColl => {
          var subComments = [];
          if (subColl.size !== 0) {
            console.log("found");
            subColl.forEach(subComment => {
              subComments.push({
                ...subComment.data(),
                id: subComment.id
              });
            });
          }
          return resolve(subComments);
        });
    }
    return reject("error");
  });



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
        //เพิ่มเข้า
        love.push(uid);
      } else {
        //เอาออก
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


//? คือไรวะ
export const fetchSections = () => (dispatch, getState) => {
  const { auth } = getState();
  db.collection("sections")
    .where("ownerUid", "==", auth.data.uid)
    .get()
    .then(sectionsDocs => {
      var sections = [];
      sectionsDocs.forEach((section, index) => {
        sections.push(section.data());
      });
      /* dispatch({type:}) */
    });
};

export const allowPublic = (postId, isPublic) => (dispatch, getState) => {
  db.collection("posts")
    .doc(postId)
    .update({
      public: isPublic
    })
    .then(() => {
      hist.go(0);
    });
};

// ############################## Classrooms #######################################

export const fetchClassrooms = () => (dispatch, getState) => {
  dispatch({ type: FETCH_CONTENT });
  db.collection("users").onSnapshot(snap => {
    var members = [];
    snap.forEach(member => {
      members.push(member.data());
    });
    dispatch({
      type: FETCH_CONTENT_SUCCESS,
      payload: members,
      contentType: "classroom"
    });
  });
};

export const clearClassrooms = () => dispatch => {
  dispatch({ type: FETCH_CONTENT_CLEAR });
};

export const createClassroom = (name, password) => (dispatch, getState) => {
  const { auth } = getState();
  db.collection("classrooms").add({
    ownerUid: auth.data.uid,
    name: name,
    password: password
  });
};

export const fetchPromotePass = () => (dispatch, getState) => {
  const { auth } = getState();
  const sysRef = db.collection("systems").doc("classroom");
  sysRef.onSnapshot(snap => {
    var promote = {
      available: snap.data().available
    };
    if (promote.available === true && auth.status === "administrator")
      promote = {
        ...snap.data()
      };
    return dispatch({ type: FETCH_CONTENT_ADD_MODAL, modal: promote });
  });
};

export const promoteStatus = yourCode => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    const { auth } = getState();
    db.collection("systems")
      .doc("classroom")
      .get()
      .then(docRef => {
        if (docRef.data().available) {
          if (yourCode === docRef.data().password) {
            const toStatus = docRef.data().toStatus;
            db.collection("users")
              .doc(auth.data.uid)
              .update({
                status: toStatus
              });
            resolve();
            setTimeout(() => {
              hist.go(0);
            }, 5000);
          } else {
            return reject("failed");
          }
        }
      });
  });
};
