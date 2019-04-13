const functions = require("firebase-functions");
const admin = require("firebase-admin");
const algoliasearch = require("algoliasearch");
const ALGOLIA_APP_ID = "81E61Q7CM2";
const ALGOLIA_ADMIN_KEY = "177377b3c5d49be631d61ef277408553";
const ALGOLIA_INDEX_NAME = "Enjoyneering";

admin.initializeApp(functions.config().firebase);

exports.addFirestoreDataToAlgolia = functions.https.onRequest((req, res) => {
  var arr = [];

  admin
    .firestore()
    .collection("posts")
    .get()
    .then(docs => {
      docs.forEach(doc => {
        let data = doc.data();
        let post = {
          title: data.title,
          subtitle: data.subtitle,
          tags: data.tags,
          objectID: doc.id,
          date: data.date,
        };
        arr.push(post);
      });
      console.log(arr);
      var client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
      var index = client.initIndex(ALGOLIA_INDEX_NAME);
      // eslint-disable-next-line handle-callback-err
      index.saveObjects(arr, function(err, content) {
        res.status(200).send(content);
      });
      return 0;
    })
    .catch(e => console.log(e));
});

// Update the search index every time a blog post is written.
exports.onNoteCreated = functions.firestore
  .document("posts/{postId}")
  .onCreate((snap, context) => {
    // Get the note document
    let data = doc.data();
    let post = {
      title: data.title,
      subtitle: data.subtitle,
      tags: data.tags,
      objectID: doc.id,
      date: data.date
    };

    // Write to the algolia index
    const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    return index.addObject(post);
  });

exports.onNoteCreated = functions.firestore
  .document("posts/{postId}")
  .onDelete((snap, context) => {
    // Get the note document
    var objectID = snap.id;

    // Write to the algolia index
    const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    return index.deleteObject(objectID);
  });

// Notification when someone love your post
exports.updateLoveNotification = functions.firestore
  .document("posts/{postId}")
  .onUpdate((change, context) => {
    const newValue = change.after.data();
    const oldValue = change.before.data();
    const postId = context.params.postId;
    var ownerRef = admin
      .firestore()
      .collection("users")
      .doc(newValue.ownerUid)
      .collection("notifications");
    //add Love Notification to Post Owner
    if (oldValue.love.length !== newValue.love.length) {
      return ownerRef.doc(postId + "L").set({
        type: "love",
        title: newValue.title,
        love: newValue.love.length,
        postId: postId,
        seen: false,
        date: new Date()
      });
    }
  });
// Notification when someone Comment your post
exports.updateCommentNotification = functions.firestore
  .document("posts/{postId}/comments/{commentId}")
  .onWrite((change, context) => {
    const newValue = change.after.data();
    const oldValue = change.before.data();
    const postId = context.params.postId;
    const commentId = context.params.commentId;
    const postRef = admin
      .firestore()
      .collection("posts")
      .doc(postId);
    return postRef.get().then(snap => {
      const postData = snap.data();
      var ownerRef = admin
        .firestore()
        .collection("users")
        .doc(postData.ownerUid)
        .collection("notifications");
      return ownerRef.doc(postId + "C").set({
        type: "comment",
        title: postData.title,
        comment: newValue.ownerUid,
        postId: postId,
        seen: false,
        date: new Date()
      });
    });
  });

  //Generate Password for Promote Status
exports.generatePassword=functions.https.onRequest((req,res)=>{
var length = 8,
  charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  retVal = "";
for (var i = 0, n = charset.length; i < length; ++i) {
  retVal += charset.charAt(Math.floor(Math.random() * n));
}
res.send(retVal);

})


