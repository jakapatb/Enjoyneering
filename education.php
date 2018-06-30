<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Education page</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>
</head>

<body>
    <?php
         include 'nav.php';
       ?>
        <div class="container-fluid">
            <!-- Top menu bar -->

            <!-- Card frame -->
            <div class="content row col-md-6 d-flex justify-content-center">
                <div class="card-deck">
                    <!-- Card:Teacher -->
                    <div class="card">
                        <div class="card-body">
                            <img src="img/Teacher_male.png" class="img-fluid" alt="Education">
                            <br>
                            <h1 class="card-title">Teacher</h1>

                            <a class="btn btn-dark float-left btn-sm col-sm-6 border" href="#">Sign Up</a>
                            <a class="btn btn-dark float-right btn-sm col-sm-6 border" href="#">Login</a>
                        </div>
                    </div>
                    <!-- Card:Student -->
                    <div class="card">
                        <div class="card-body">
                            <img src="img/Student_Male.png" class="img-fluid" alt="forum">

                            <br>
                            <h1 class="card-title">Student</h1>

                            <a class="btn btn-dark float-left btn-sm col-sm-6 border" href="#">Sign Up</a>
                            <a class="btn btn-dark  btn-sm float-right col-sm-6 border" href="#">Login</a>
                        </div>
                    </div>

                </div>
            </div>


        </div>

</body>

</html>