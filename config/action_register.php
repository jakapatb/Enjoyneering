<html>
<body>
<?php

    $Mail = trim($_POST['txtMail']);
    $Username = trim($_POST['txtUsername']);
    $Password = trim($_POST['txtPassword']);
    $ConPassword = trim($_POST['txtConPassword']);
    $FName = trim($_POST['txtFirstName']);
    $LName = trim($_POST['txtLastName']);
    $Gender = trim($_POST['Gender']);
    $Status = $_POST['ddlStatus'];
    include("php/config.php");
       if($Mail == "")
    {
        echo "<script type='text/javascript'>alert('Please input Mail!');</script>";
        echo "<script type='text/javascript'>window.history.go(-1);</script>";
        exit();
    }
    if($Username == "")
    {
        echo "<script type='text/javascript'>alert('Please input Username!');</script>";
        echo "<script type='text/javascript'>window.history.go(-1);</script>";
        exit();
    }
    if($Password == "")
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
    }
 

    $strSQL = "SELECT ID,Username FROM /*ชื่อตาราง*/ WHERE Mail = '".$Mail."' && Username = '".$Username."'";
    $objQuery = mysqli_query($objCon,$strSQL);
    $objResult = mysqli_fetch_array($objQuery);
    if($objResult)
    {
        echo "<script type='text/javascript'>alert('Mail or Username already exists!');</script>";
        echo "<script type='text/javascript'>window.history.go(-1);</script>";
    }
    else
    {
        $strSQL = "INSERT INTO /*ชื่อตาราง*/ (Mail, Username,Password, Status) VALUES ('".$Mail."','".$Username."','".$Password."','".$Status."')";
        $objQuery = mysqli_query($objCon,$strSQL);
        if ($Status == 'TEACHER'){
            $tbl='teacher';
        }
        else{
            $tbl='student';
        }
    $strSQL = "INSERT INTO ".$tbl." (`Mail`, `Fname`, `Lname`,`Gender`,) VALUES ('".$Mail."','".$FName."','".$LName."','".$Gender."')";
            $objQuery = mysqli_query($objCon,$strSQL);
    
        echo "<script type='text/javascript'>alert('Registered!');</script>";
        echo "<script type='text/javascript'>window.location='login.php';</script>";
    }
    
    $strSQL = "SELECT ID,Username FROM /*ชื่อตาราง*/ WHERE Mail = '".$Mail."' && Username = '".$Username."'";
    $objQuery = mysqli_query($objCon,$strSQL);
    $objResult = mysqli_fetch_array($objQuery);
    if(!$objResult)
    {
        echo "<script type='text/javascript'>alert('Register Fail!');</script>";
    }
    
    echo "<script type='text/javascript'>window.location='login.php';</script>";
    
mysqli_close($objCon);
?>
</body>
</html>