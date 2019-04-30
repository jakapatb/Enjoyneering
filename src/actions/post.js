import {
  FETCH_POST,
  FETCH_POST_SUCCESS,
  FETCH_POST_CLEAR,
  FETCH_POST_UPLOADED,
  FETCH_POST_PREUPLOAD,
  FETCH_POST_FAIL,
} from "../configs/constants";
import firebase from "../configs/firebase";
const db = firebase.firestore();

//Create & Edit Post

export const sendPost = post => (dispatch, getState) => {
  const contentLength = post.contents.length;
  dispatch({ type: FETCH_POST_PREUPLOAD, length: contentLength });
  const { auth } = getState();
  //add or Update data except contents
  const postsRef = db.collection("posts");
  const details = {
    title: post.title,
    subtitle: post.subtitle,
    ownerUid: [auth.data.uid],
    tags: post.tags,
    public: auth.status === "student" ? false : true,
    recommend: false
  };

  if (post.postId === undefined) {
    //new Post //? should set Love_count?
    postsRef
      .add({ ...details, love: [], love_count: 0, date: new Date() })
      .then(postRef => {
        updateContents(
          post.contents,
          postRef.id,
          post.deletedContents,
          dispatch
        ).then(() => {
          if (post.file === undefined) {
            dispatch({
              type: FETCH_POST_UPLOADED,
              index: contentLength,
              postId: postRef.id
            });
          }
          var uploadTask = firebase
            .storage()
            .ref("posts")
            .child(postRef.id + "/title.jpg")
            .put(post.file);
          uploadTask.on(
            "state_changed",
            snapshot => {
              //use for see progress
              var progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
            },
            err => {
              //error
              console.log(err);
            },
            () => {
              //upload title img successful
              uploadTask.snapshot.ref.getDownloadURL().then(imgUrl => {
                postsRef.doc(postRef.id).update({ imgUrl: imgUrl });
                dispatch({
                  type: FETCH_POST_UPLOADED,
                  index: contentLength,
                  postId: postRef.id
                });
              });
            }
          );
        });
      });
  } else {
    //Edit Post
    postsRef
      .doc(post.postId)
      .update({ ...details, updated: new Date() })
      .then(() => {
        updateContents(
          post.contents,
          post.postId,
          post.deletedContents,
          dispatch
        ).then(() => {
          console.log("pass all Updated");

          if (!post.isChangeTitleImg) {
            dispatch({
              type: FETCH_POST_UPLOADED,
              index: contentLength,
              postId: post.postId
            });
          }
          var uploadTask = firebase
            .storage()
            .ref("posts")
            .child(post.postId + "/title.jpg")
            .put(post.file);
          uploadTask.on(
            "state_changed",
            snapshot => {
              //use for see progress
              var progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
            },
            err => {
              //error
              console.log(err);
            },
            () => {
              //upload title img successful
              uploadTask.snapshot.ref.getDownloadURL().then(imgUrl => {
                postsRef.doc(post.postId).update({ imgUrl: imgUrl });
                dispatch({
                  type: FETCH_POST_UPLOADED,
                  index: contentLength,
                  postId: post.postId
                });
              });
            }
          );
        });
      })
      .catch(e => console.log(e));
  }
};

//! อัพรูปที่ละมากๆไม่ได้
const updateContents = (contents, postId, deletedContents, dispatch) =>
  new Promise((resolve, reject) => {
    const batch = db.batch();
    const contentsRef = db
      .collection("posts")
      .doc(postId)
      .collection("contents");
    const postsImgRef = firebase.storage().ref("posts");
    console.log("updateContents");

    // Delete useless Content
    if (deletedContents !== []) {
      deletedContents.map(async content => {
        batch.delete(contentsRef.doc(content.id));
        if (content.type === "Image") {
          //ลบรูป
          await postsImgRef
            .child(postId + "/" + content.fileName)
            .delete()
            .then(() => console.log("SUCCESS"))
            .catch(e => console.log(e));
        }
        return 0;
      });
    }
    batch.commit().then(() => {
      // add & update Contents
      contents.map((content, index) => {
        console.log("mapping");

        updateContent(content, postId)
          .then(result => {
            console.log("uploaded");
            dispatch({
              type: FETCH_POST_UPLOADED,
              index: result,
              postId: postId
            });
          })
          .catch(e => console.log(e));
        return true;
      });
      return resolve();
    });
  });

const updateContent = (content, postId) =>
  new Promise((resolve, reject) => {
    const ImgPostsRef = firebase.storage().ref("posts");
    const postRef = db.collection("posts").doc(postId);
    var outPutContent = {
      index: content.index,
      type: content.type,
      ready: true //? For what?
    };
    console.log(content);

    //only Image
    if (content.type === "Image") {
      // task
      if (content.file === undefined) {
        console.log("not Change");

        return resolve(content.index);
      }
      var task = ImgPostsRef.child(
        postId + "/pic" + content.index + "." + content.fileType
      ).put(content.file);
      task.on(
        "state_changed",
        snapshot => {
          //use for see progress
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        err => console.log(err),
        () => {
          //uploaded
          task.snapshot.ref.getDownloadURL().then(imgUrl => {
            outPutContent = {
              ...outPutContent,
              imgUrl: imgUrl,
              fileName: "pic" + content.index + "." + content.fileType
            };
            console.log(content.id);

            if (content.id === undefined) {
              outPutContent = { ...outPutContent, date: new Date() };
              postRef.collection("contents").add(outPutContent);
            } else {
              outPutContent = { ...outPutContent, updated: new Date() };
              postRef
                .collection("contents")
                .doc(postId)
                .update(outPutContent);
            }

            // section done
            return resolve(content.index);
          });
        }
      );
    } else {
      if (content.type === "Article") {
        outPutContent = {
          ...outPutContent,
          title: content.title,
          content: content.content
        };
      } else if (content.type === "Youtube") {
        outPutContent = {
          ...outPutContent,
          autoplay: 0,
          videoId: content.videoId
        };
      }
      //add or update
      if (content.id === undefined) {
        outPutContent = { ...outPutContent, date: new Date() };
        postRef.collection("contents").add(outPutContent);
      } else {
        outPutContent = { ...outPutContent, updated: new Date() };
        postRef
          .collection("contents")
          .doc(postId)
          .update(outPutContent);
      }
      // section done
      return resolve(content.index);
    }
  });

// fetch Post when coming to Post.
export const fetchPost = postId => dispatch =>
  new Promise((resolve, reject) => {
    dispatch({
      type: FETCH_POST
    });
    const postRef = db.collection("posts").doc(postId);
    postRef.get().then(post => {
      if(post.exists){
postRef
  .collection("contents")
  .get()
  .then(contentsRef => {
    var contents = [];
    contentsRef.forEach(content =>
      contents.push({
        ...content.data(),
        id: content.id
      })
    );
    dispatch({
      type: FETCH_POST_SUCCESS,
      public: post.data().public,
      id: post.id,
      payload: {
        ...post.data(),
        id: post.id,
        //imgUrl: imgUrl,
        contents: contents
      }
    });
    return resolve();
  });
      }else {
        dispatch({type:FETCH_POST_FAIL})
        return reject();
      }
    })
  });

//Clear data when exit this Post.
export const clearPost = () => dispatch => {
  dispatch({ type: FETCH_POST_CLEAR });
};

export const deletePost = postId => (dispatch, getState) => new Promise((resolve, reject) => {
  {
    dispatch({type:FETCH_POST})
         const { auth } = getState();
         const postRef = db.collection("posts").doc(postId);
         db.runTransaction(async transaction => {
           const postDoc = await transaction.get(postRef);
           console.log(postDoc.data().ownerUid);
           if (
             postDoc.data().ownerUid.includes(auth.data.uid) ||
             auth.state === "administrator"
           ) {
             transaction.delete(postRef)
           }
         }).finally(()=>{
           dispatch({type: FETCH_POST_CLEAR})
           return resolve()
         })
       };
})

