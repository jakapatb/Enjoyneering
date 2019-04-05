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
import { getUserFromUid } from "./helpers";
const db = firebase.firestore();

/**
 *!Lost Functions
 *! 1.
 */

export const checkStateUser = () => (dispatch, getState) => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      const dataUser = user.providerData[0];
      var payload = {
        displayName: dataUser.displayName,
        uid: user.uid,
        photoURL: dataUser.photoURL,
        status: "visitor"
      };
      const userRef = db.collection("users").doc(user.uid);
      db.runTransaction(transaction => {
        transaction.get(userRef).then(userDoc => {
          if (userDoc.exists) {
            //already Member
            payload.status = userDoc.data().status;
          }
          dispatch({ type: FETCH_USER_SUCCESS, payload: payload });
          transaction.update(userRef, payload);
        });
      });
      //notifications
      userRef.collection("notifications")
      .orderBy("date","desc")
      .limit(5)
      .onSnapshot(notiSnap => {
        var notifications = [];
        notiSnap.forEach(noti =>
          notifications.push({ ...noti.data(), notiId: noti.id })
        );
        dispatch({ type: FETCH_NOTI_SUCCESS, payload: notifications });
      });
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
    .orderBy("love_count","desc")
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
    .orderBy("date","desc")
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
      //  getImgfromStorage(postId, "title.jpg").then(imgUrl =>
          getUserFromUid(post.data().ownerUid).then(owner =>
            dispatch({
              type: FETCH_POST_SUCCESS,
              payload: {
                ...post.data(),
                id: post.id,
                //imgUrl: imgUrl,
                owner: owner,
                contents: contents
              }
            })
      //    )
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

//Create & Edit Post

export const sendPost = post => (dispatch, getState) => {
  dispatch({type:FETCH_POST});
  const { auth } = getState();
  //add or Update data except contents
  const postsRef = db.collection("posts");
  const details = {
    title: post.title,
    subtitle: post.subtitle,
    ownerUid: auth.data.uid,
    tags: post.tags
  };


  if (post.postId === undefined) {
    //new Post //? should set Love_count?
    postsRef
      .add({ ...details, love: [], love_count: 0, date: new Date() })
      .then(postRef => {
        updateContents(post.contents, postRef.id, post.deletedContents);
        if(post.file === undefined){
          return hist.push("/landing-page/?post=" + postRef.id);
        }
        var uploadTask = firebase
        .storage()
        .ref("posts")
        .child(postRef.id + "/title.jpg")
        .put(post.file);
        uploadTask.on('state_changed',snapshot =>{
          //use for see progress
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },err =>{ 
          //error 
          console.log(err)
        },() =>{
          //upload title img successful
          return hist.push("/landing-page/?post=" + postRef.id);
        })

      });
  } else {
    //Edit Post
    postsRef
      .doc(post.postId)
      .update({ ...details, updated: new Date() })
      .then(() => {
        updateContents(post.contents, post.postId, post.deletedContents);

        if (!post.isChangeTitleImg) {
          console.log("pass HERE")
          //return hist.push("/landing-page/?post=" + post.postId);
        }
        console.log("Testing")
        var uploadTask = firebase
            .storage()
            .ref("posts")
            .child(post.postId + "/title.jpg")
            .put(post.file);
            uploadTask.on('state_changed',snapshot =>{
              //use for see progress
              var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
            },err =>{ 
              //error 
              console.log(err)
            },() =>{
              //upload title img successful
              return hist.push("/landing-page/?post=" + post.postId);
            })

      })
      .catch(e => console.log(e));
  }
};

const updateContents = (contents, postId, deletedContents) => {
  //add Image Title to storage
  const batch = db.batch();
  const contentsRef = db
    .collection("posts")
    .doc(postId)
    .collection("contents");
  const postsImgRef = firebase.storage().ref("posts");
  // Delete useless Content
  deletedContents.map(content => {
    batch.delete(contentsRef.doc(content.id));
    if (content.type === "Image") {
      //ลบรูป
      postsImgRef
        .child(postId + "/" + content.fileName)
        .delete()
        .then(() => console.log("SUCCESS"))
        .catch(e => console.log(e));
    }
    return 0;
  });
  batch.commit().then(() => {
    // add & update Contents
    contents.map((content, index) => {
      var outPutContent = {
        index: content.index,
        type: content.type,
        ready: true //? For what?
      };
      switch (content.type) {
        case "Article":
          outPutContent = {
            ...outPutContent,
            title: content.title,
            content: content.content
          };
          break;
        case "Image":
          outPutContent = {
            ...outPutContent,
            fileName: "pic" + index + "." + content.fileType
          };
          // Add Image to storage
          postsImgRef
            .child(postId + "/pic" + index + "." + content.fileType)
            .put(content.file);
          break;
        case "Youtube":
          outPutContent = {
            ...outPutContent,
            autoplay: 0,
            videoId: content.videoId
          };
          break;
        default:
          break;
      }

      //add info to firestore
      if (content.id === undefined) {
        // new Content
        return contentsRef.add(outPutContent);
      } else {
        //edit Content
        return contentsRef.doc(content.id).set(outPutContent);
      }
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
      sectionsDocs.forEach((section,index) => {
        sections.push(section.data())
      });
      /* dispatch({type:}) */

    });
};
