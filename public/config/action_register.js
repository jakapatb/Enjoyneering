var mysql=require('mysql');
var con = mysql.createConnection({
  host: ".....",
  user: ".....",
  password: ".......",
  database: "....."
});//กุงงตรงนี้สัส
    var Mail = Mail;
    var Password = Password;
    var ConPassword = ConPassword;
    var FName = FName;
    var LName = LName;
    var Status = Status;
    if( Mail == '')
    {
        console.log('Please input Mail!');
        window.history.go(-1);
        exit();
    }//ไม่มั่นใจวะ
/*    if($Password == "")
    {
        echo "<script type='text/javascript'>alert('Please input Password!');</script>";
        echo "<script type='text/javascript'>window.history.go(-1);</script>";
        exit();
    }
    if($FName == "")
    {
        echo "<script type='text/javascript'>alert('Please input First Name!');</script>";
        echo "<script type='text/javascript'>window.history.go(-1);</script>";
        exit();
    }
    if($LName == "")
    {
        echo "<script type='text/javascript'>alert('Please input Last Name!');</script>";
        echo "<script type='text/javascript'>window.history.go(-1);</script>";
        exit();
    }
    if($Gender == "")
    {
        echo "<script type='text/javascript'>alert('Please input Gender!');</script>";
        echo "<script type='text/javascript'>window.history.go(-1);</script>";
        exit();
    }
    if($Status == "")
    {
        echo "<script type='text/javascript'>alert('Please input Status!');</script>";
        echo "<script type='text/javascript'>window.history.go(-1);</script>";
        exit();
    }
    if($_POST['txtPassword'] != $_POST['txtConPassword'])
    {
        echo "<script type='text/javascript'>alert('Password not Match!');</script>";
        echo "<script type='text/javascript'>window.history.go(-1);</script>";
        exit();
    }*/
var objResult = con.query("SELECT Mail FROM ชื่อตาราง WHERE Mail = Mail");
    
    if(objResult)
    {
        console.log('Mail or Username already exists!');//หาวิธีใช้alertยังไม่เจอ
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
        console.log('Registered!');//หาวิธีใช้alertยังไม่เจอ;
       window.location=/*ไปไหนต่อวะ*/;
    }
    
