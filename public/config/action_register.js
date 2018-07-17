function register(){
    var Mail = document.getElementById('mail').value;
    var Password = document.getElementById('password').value;
    var ConPassword =document.getElementById('Conpassword').value;
    var FName =document.getElementById('Fname').value;
    var LName = document.getElementById('Lname').value;
    var Status = document.getElementById('status').value;
    if( Mail == "")
    {
        alert("Please input Mail!");
        return;
    }
    if( Password== "")
    {
        alert("Please input Password!");
        return;
    }
    if(FName == "")
    {
        alert("Please input FristName!");
       return;
    }
    if(LName == "")
    {
        alert("Please input LastName!");
        return;
    }
    if(Status == "")
    {
        alert("Please input Status!");
        return;
    }
    if(Password != ConPassword)
    {
        alert("Password not Match!");
        return;
    }
}
firebase.auth().createUserWithEmailAndPassword(mail,password).catch(function(error){
    var errorCode = error.code;
    var errorMessage = error.message;
    if(errorCode =='auto/weak-password'){
        alert('The passwork is too weak.');
    }else{
        alert(errorMessage);
    }
    console.log(error);
}