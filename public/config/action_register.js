/*var mysql=require('mysql');
var con = mysql.createConnection({
  host: ".....",
  user: ".....",
  password: ".......",
  database: "....."
});//กุงงตรงนี้สัส*/
    var Mail = new Mail();
    var Password = new Password();
    var ConPassword =new ConPassword();
    var FName = new FName();
    var LName = new LName();
    var Status = new Status();
    if( Mail() == "")
    {
        alert('Please input Mail!');
        
    }
    if(Password() == "")
    {
        alert('Please input Password!');

       
    }
    if(FName() == "")
    {
        alert('Please input FristName!');
 
       
    }
    if(LName() == "")
    {
        alert('Please input LastName!');

    }
    if(Status() == "")
    {
        alert('Please input Status!');

    }
    if(Password() != ConPassword())
    {
        alert('Password not Match!');

    }
//flie base
/*var objResult = con.query("SELECT Mail FROM ชื่อตาราง WHERE Mail = Mail");
    
    if(objResult)
    {
        alert('Mail or Username already exists!');
        window.history.go(-1);
    }
    else
    {
        var sql = "INSERT INTO ชื่อตาราง (Mail,Password,Status) VALUES (Mail,Username,Password,Status)";
        if (Status == 'TEACHER'){
            var tbl='teacher';
        }
        else{
            var tbl='student';
        }
    var sql = "INSERT INTO tbl ('Mail', 'Fname', 'Lname') VALUES (Mail,FName,LName)";
        alert('Registered!');
       window.location=ไปไหนต่อวะ;
}*/
    
    
