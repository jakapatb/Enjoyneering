import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
admin.initializeApp(functions.config().firebase);
export const onMessageCreate = functions.database
.ref('test').onCreate((snap,context)=>{
  const room  Id =context.params.test
})
