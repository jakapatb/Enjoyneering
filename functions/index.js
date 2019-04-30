const functions = require("firebase-functions");
const admin = require("firebase-admin");
const algoliasearch = require("algoliasearch");
const ALGOLIA_APP_ID = "81E61Q7CM2";
const ALGOLIA_ADMIN_KEY = "177377b3c5d49be631d61ef277408553";
const ALGOLIA_INDEX_NAME = "Enjoyneering";
/**const express = require('express');
const cors = require('cors');

const app = express(); */

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
          recommend: data.recommend,
          public: data.public
        };
        arr.push(post);
      });
      console.log(arr);
      var client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
      var index = client.initIndex(ALGOLIA_INDEX_NAME);
      // eslint-disable-next-line handle-callback-err
      index.saveObjects(arr, (err, content) => {
        res.status(200).send(content);
      });
      return 0;
    })
    .catch(e => console.log(e));
});

// Update the search index every time a blog post is written.
exports.onNoteCreated = functions.firestore
  .document("posts/{postId}")
  .onCreate((doc, context) => {
    // Get the note document
    let data = doc.data();
    let post = {
      title: data.title,
      subtitle: data.subtitle,
      tags: data.tags,
      objectID: doc.id,
      date: data.date,
      recommend:data.recommend,
      public:data.public,
    };

    // Write to the algolia index
    const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    return index.addObject(post, (err, content) => {
      if (err) throw err;
      console.log(content);
    });
  });


exports.onNoteUpdated = functions.firestore
  .document("posts/{postId}")
  .onUpdate((doc, context) => {
    // Get the note document
    let data = doc.data();
    let post = [
      {
        title: data.title,
        subtitle: data.subtitle,
        tags: data.tags,
        objectID: doc.id,
        date: data.date,
        recommend: data.recommend,
        public: data.public
      }
    ];

    // Write to the algolia index
    const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    index.partialUpdateObjects(post, (err, content) => {
      if (err) throw err;
      console.log(content);
    });
  });




exports.onNoteDelete = functions.firestore
  .document("posts/{postId}")
  .onDelete((snap, context) => {
    // Get the note document
    var objectID = snap.id;

    // Write to the algolia index
    const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    return index.deleteObject(objectID, (err, content) => {
      if (err) throw err;
      console.log(content);
    });
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
var infoUpdate={}
infoUpdate['promoteStatus.password'] = retVal
admin.firestore().collection("systems").doc("classroom").update(infoUpdate)
})

exports.getPassword = functions.https.onRequest((req,res)=>{
res.send(req.params.id)
})

/**exports.generateThumbnail = functions.storage.object('post/{postId}/{imageId}').onChange(event => {

  const object = event.data; // The Storage object.

  console.log(object)

  const fileBucket = object.bucket; // The Storage bucket that contains the file.
  const filePath = object.name; // File path in the bucket.
  const contentType = object.contentType; // File content type.
  const resourceState = object.resourceState; // The resourceState is 'exists' or 'not_exists' (for file/folder deletions).
  const metageneration = object.metageneration; // Number of times metadata has been generated. New objects have a value of 1.

  const SIZES = [64, 256, 512]; // Resize target width in pixels

  if (!contentType.startsWith('image/') || resourceState === 'not_exists') {
    console.log('This is not an image.');
    return;
  }

  if (_.includes(filePath, '_thumb')) {
    console.log('already processed image');
    return;
  }


  const fileName = filePath.split('/').pop();
  const bucket = gcs.bucket(fileBucket);
  const tempFilePath = path.join(os.tmpdir(), fileName);

   bucket.file(filePath).download({
    destination: tempFilePath
  }).then(() => {

    return _.each(SIZES, (size) => {

      let newFileName = `${fileName}_${size}_thumb.png`
      let newFileTemp = path.join(os.tmpdir(), newFileName);
      let newFilePath = `thumbs/${newFileName}`

      sharp(tempFilePath)
        .resize(size, null)
        .toFile(newFileTemp, (_err, info) => {
        return  bucket.upload(newFileTemp, {
            destination: newFilePath
          });
        });

    })
  }).catch((e)=>console.log(e))
}) */