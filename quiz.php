<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Quiz</title>
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
            <!--TODO : name Subject -->
            <h2>Quiz:(Subject)</h2>
            <div class="row">
                <!-- Zone Left:Teacher-->
                <div class="col col-md-3 bg-dark" style="width: 10rem;"><br>
                    <div class="card">
                        <div class="card-header">
                            <h3>Teacher</h3>

                        </div>
                        <div class="card-body">
                            <!--TODO : iamge teacher -->
                            <img src="img/person.png" alt="teacher" class="img-fluid">

                        </div>
                        <div class="card-footer">
                            <!--TODO: name teacher-->
                            <h5> Mr.FirstName LastName </h5>
                        </div>

                    </div>
                    <br>
                </div>
                <!-- Zone Right: Question-->
                <div class="col bg-light ">
                    <h2>Question <span class="badge badge-success">18/20</span></h2>
                    <p>qustion </p>
                    <!--Zone Answer-->
                    <div class="row">
                        <div class="col-sm-3 bg-warning">
                            <h2>A</h2>
                            <p>information</p>
                        </div>
                        <div class="col-sm-3 bg-secondary">
                            <h2>B</h2>
                            <p>information</p>
                        </div>
                        <div class="col-sm-3 bg-light">
                            <h2>C</h2>
                            <p>information</p>
                        </div>
                        <div class="col-sm-3 bg-dark">
                            <h2 class="text-white">D</h2>
                            <p class="text-white">information</p>
                        </div>
                    </div>

                    <!-- Zone countdown-->
                    <div class="col">
                        <h2>Countdown</h2>
                        <div class="progress">
                            <!--TODO add :timing form Database-->
                            <div class="progress-bar" style="width:70%; height:16px">70%</div>
                        </div>

                    </div>
                </div>
            </div>


            <br>


            <!-- Zone Student 
    TODO : when student come here add that student -->
           
           
           
            <h3>Student <span class="badge badge-success">4/6</span></h3>
            <div class="row bg-light ">



                <!-- Card Student -->
                <div class="card " style="width: 10rem;">
                    <div class="card-body">
                        <!--TODO : iamge student -->
                        <img src="img/person.png" alt="student" class="img-fluid">

                    </div>
                    <div class="card-footer">
                        <!--TODO: name student -->
                        <p> Mr.FirstName LastName </p>
                    </div>

                </div>

                <!-- Card Student -->
                <div class="card bg-secondary " style="width: 10rem;">
                    <div class="card-body">
                        <!--TODO : iamge student -->
                        <img src="img/person.png" alt="student" class="img-fluid">

                    </div>
                    <div class="card-footer">
                        <!--TODO: name student -->
                        <p> Mr.FirstName LastName </p>
                    </div>

                </div>

                <!-- Card Student -->
                <div class="card " style="width: 10rem;">
                    <div class="card-body">
                        <!--TODO : iamge student -->
                        <img src="img/person.png" alt="student" class="img-fluid">

                    </div>
                    <div class="card-footer">
                        <!--TODO: name student -->
                        <p> Mr.FirstName LastName </p>
                    </div>

                </div>

                <!-- Card Student -->
                <div class="card " style="width: 10rem;">
                    <div class="card-body">
                        <!--TODO : iamge student -->
                        <img src="img/person.png" alt="student" class="img-fluid">

                    </div>
                    <div class="card-footer">
                        <!--TODO: name student -->
                        <p> Mr.FirstName LastName </p>
                    </div>

                </div>

                <!-- Card Student -->
                <div class="card  bg-secondary" style="width: 10rem;">
                    <div class="card-body">
                        <!--TODO : iamge student -->
                        <img src="img/person.png" alt="student" class="img-fluid">

                    </div>
                    <div class="card-footer">
                        <!--TODO: name student -->
                        <p> Mr.FirstName LastName </p>
                    </div>

                </div>

                <!-- Card Student -->
                <div class="card " style="width: 10rem;">
                    <div class="card-body">
                        <!--TODO : iamge student -->
                        <img src="img/person.png" alt="student" class="img-fluid">

                    </div>
                    <div class="card-footer">
                        <!--TODO: name student -->
                        <p> Mr.FirstName LastName </p>
                    </div>

                </div>

            </div>

        </div>
</body>

</html>