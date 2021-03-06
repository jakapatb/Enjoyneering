import {
  FETCH_USER,
  FETCH_LIST_POPULAR,
  FETCH_LIST_RECENT,
  FETCH_LIST,
  FETCH_POST_SET_COMMENT,
  FETCH_POST_ADD_COMMENT,
  FETCH_POST_OLD_COMMENT,
  FETCH_POST_DELETE_COMMENT,
  FETCH_CONTENT,
  FETCH_CONTENT_CLEAR,
  FETCH_CONTENT_SUCCESS,
  FETCH_CONTENT_ADD_MODAL,
  FETCH_LIST_CLEAR
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
  console.log("Mark work");
  const { auth } = getState();
  var batch = db.batch();
  const uid = auth.data.uid;
  const notiRef = db
    .collection("users")
    .doc(uid)
    .collection("notifications")
    .doc(notiId);
  batch.update(notiRef, { seen: true });
  batch.commit();
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
       // ! ใช้ไม่ได้ งงชิบ
       if (!auth.isAuth || auth.status === "visitor") {
         //  visitor & notAuth only see public post
         postsRef = postsRef.where("public", "==", true);
       }

       if (condition.type === "where") {
         console.log(condition);
         postsRef = postsRef.where(
           condition.name,
           condition.operator,
           condition.value
         );
       } else {
         postsRef = postsRef.orderBy("date", "desc");
       }

       postsRef
         .limit(9)
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
export const fetchMorePost =  (listName, condition = { type: "recent" })  => (dispatch, getState) =>
  new Promise((resolve, reject) => {
    const { listPost } = getState();
    var postsRef = db.collection("posts")
    let endPost = listPost.recent[listPost.recent.length - 1];

    if (condition.type === "where") {
      console.log(condition);
      postsRef = postsRef.where(
        condition.name,
        condition.operator,
        condition.value
      );
    } else {
      postsRef = postsRef.orderBy("date", "desc");
    }
    postsRef
      .startAfter(endPost.date)
      .limit(9)
      .get()
      .then(snapPosts => {
        var newListPost = [];
        snapPosts.forEach(post => {
          newListPost.push({ ...post.data(), id: post.id });
        });
        let sumList = listPost.recent.concat(newListPost);
        dispatch({
          type: FETCH_LIST_RECENT,
          listName: listName,
          listPost: sumList,
          hasRecent: true
        });
        if (snapPosts.size < 9) {
          return reject();
        }
        return resolve();
      });
  });

export const clearListPost = () => dispatch => {
  dispatch({ type: FETCH_LIST_CLEAR });
};

// * Post

//Send Comment
export const sendComment = comment => (dispatch, getState) => {
  const { post } = getState();
  const commentsRef = db.collection("posts").doc(post.data.id);
  commentsRef.collection("comments").add(comment);
};

//fetch Comments
export const fetchComments = (postId, after = 0) => (dispatch, getState) =>
  new Promise(async (resolve, reject) => {
    const { post } = getState();
    let start = null;
    const commentsRef = db
      .collection("posts")
      .doc(postId)
      .collection("comments");

    await commentsRef
      .orderBy("date", "desc")
      .limit(5)
      .get()
      .then(snap => {
        let comments = [];
        if (snap.size !== 0) {
          start = snap.docs[0];
          snap.forEach(comment => {
            comments.push({
              id: comment.id,
              content: comment.data()
            });
          });
          comments.reverse();
          dispatch({
            type: FETCH_POST_SET_COMMENT,
            payload: comments
          });
        }
      });
    commentsRef
      .orderBy("date", "asc")
      .startAfter(start)
      .onSnapshot(snap => {
        let comments = [];
        snap.forEach(comment => {
          let payload = {
            id: comment.id,
            content: comment.data()
          };
          if (!post.comments.includes(payload)) {
            comments.push(payload);
          }
        });
        dispatch({
          type: FETCH_POST_ADD_COMMENT,
          payload: comments
        });
        return resolve();
      });
  });
export const fetchOldComments = postId => (dispatch, getState) =>
  new Promise((resolve, reject) => {
    const {
      post: { comments }
    } = getState();
    let start = comments[0].content.date;
    const commentsRef = db
      .collection("posts")
      .doc(postId)
      .collection("comments");
    commentsRef
      .orderBy("date", "desc")
      .startAfter(start)
      .limit(5)
      .get()
      .then(snap => {
        let comments = [];
        snap.forEach(comment => {
          let payload = {
            id: comment.id,
            content: comment.data()
          };
          comments.push(payload);
        });

        comments.reverse();
        dispatch({
          type: FETCH_POST_OLD_COMMENT,
          payload: comments
        });
        if (snap.size < 5) return reject();
        else return resolve();
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

export const recommedPost = recomend => (dispatch, getState) => {
  const {
    post: { id }
  } = getState();
  db.collection("posts")
    .doc(id)
    .update({ recommend: recomend })
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

export const editComment = (content, commentId) => (dispatch, getState) => {
  const { post } = getState();
  db.collection("posts")
    .doc(post.id)
    .collection("comments")
    .doc(commentId)
    .update({ content: content, updated: new Date() });
};

export const deleteComment = commentId => (dispatch, getState) =>
  new Promise((resolve, reject) => {
    const { post } = getState();
    const commentRef = db
      .collection("posts")
      .doc(post.id)
      .collection("comments")
      .doc(commentId);
    commentRef.get().then(doc => {
      if (doc.exists) {
        let commentId = doc.id;
        commentRef.delete();
        dispatch({
          type: FETCH_POST_DELETE_COMMENT,
          payload: commentId
        });
        return resolve()
      }else
      {
        return reject()
      }
    });
  });
