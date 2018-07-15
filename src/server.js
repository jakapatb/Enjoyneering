function createpost(){

}
window.onload=function(){
  var firebaseRef=firebase.database().ref("Post");
  firebase.once('value').then(function(dataSnapshot){
    console.log(dataSnapshot.val());
  });
}
