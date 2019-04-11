import {
  FETCH_USER,
  FETCH_LIST_POPULAR,
  FETCH_LIST_RECENT,
  FETCH_LIST,
  FETCH_POST,
  FETCH_POST_SUCCESS,
  FETCH_POST_CLEAR,
  FETCH_POST_ADD_COMMENT,
  FETCH_CONTENT,FETCH_CONTENT_CLEAR,FETCH_CONTENT_SUCCESS
} from "../configs/constants";
import firebase from "../configs/firebase";
import { hist } from "../index.js";
import { getUserFromUid } from "./helpers";
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
    hist.push("/login-page")
};

// * list Post
// Popular List posts
export const fetchListPopPost = () => (dispatch,getState) => {
  const {
    auth
  } = getState();
  var listPopPost = [];
  var postsRef = db.collection("posts");
  if (!auth.isAuth) {
    postsRef = postsRef.where("public", "==", true)
  }
  postsRef
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
export const fetchListPost = (listName,condition={type:"recent"}) => (dispatch,getState) => {
  dispatch({
    type: FETCH_LIST
  });
  const {auth} =getState();
  var postsRef = db.collection("posts")
  var listPost = [];
  if (!auth.isAuth || auth.status === "visitor") {
    //  visitor & notAuth only see public post
    postsRef = postsRef.where("public", "==", true)
  }

 // ! ใช้ไม่ได้ งงชิบ
  if (condition.type === "where") {
    postsRef = postsRef.where(condition.name, condition.operator, condition.value)
  }else{
    postsRef = postsRef.orderBy('date', 'desc')
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
        listName:listName,
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
              public:post.data().public,
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
    tags: post.tags,
    public: auth.status === "student" ? false : true ,
    recommend:false,
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

export const allowPublic =(postId,isPublic)=>(dispatch,getState)=>{
  db.collection("posts").doc(postId).update({
    public:isPublic
  }).then(()=>{
    hist.go(0);
  })
}

// ############################## Classrooms #######################################

export const fetchClassrooms = () => (dispatch,getState) => {
  dispatch({type:FETCH_CONTENT})
  const {auth} = getState();
  db.collection("classrooms").where("ownerUid","==",auth.data.uid).onSnapshot((snap)=>{
  var classrooms =[]
   snap.forEach((classroom) => {
      classrooms.push({
        name: classroom.data().name,
        membersUid: classroom.data().membersUid
      })
   });
   dispatch({type:FETCH_CONTENT_SUCCESS,payload:classrooms})
  })
}
export const clearClassrooms = () => (dispatch) => {
  dispatch({type:FETCH_CONTENT_CLEAR})
}

export const createClassroom = (name,password) => (dispatch,getState) => {
  const {auth} = getState();
  db.collection('classrooms').add({
    ownerUid:auth.data.uid,
    name:name,
    password:password
  })
}