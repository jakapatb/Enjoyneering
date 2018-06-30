<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Enjoyneering</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>


    <body>
        <?php
         include 'nav.php';
       ?>
            <div class="container-fluid">
                <!-- Top menu bar -->

                <!-- Card frame -->
                <div class="content row col-md-6 d-flex justify-content-center">
                    <div class="card-deck">
                        <!--Card:Education -->
                        <div class="card">
                            <img src="img/education.jpg" class="img-fluid" alt="Education">


                            <div class="card-body">
                                <h1 class="card-title">Education</h1>
                                <h5 class="card-subtitle">Education page</h5>
                                <p>This for Education</p>

                            </div>

                            <div class="card-footer"><a class="btn btn-dark float-right btn-sm" href="education.php">Education page...</a></div>
                        </div>
                        <!--Card:Forum -->
                        <div class="card">

                            <img src="img/forum.jpg" class="img-fluid" alt="forum">
                            <div class="card-body">
                                <br>
                                <h1 class="card-title">Forum</h1>
                                <h5 class="card-subtitle">forum page</h5>
                                <p>This for forum</p>
                            </div>
                            <div class="card-footer"> <a class="btn btn-dark  btn-sm float-right" href="foum.php">forum page...</a> </div>

                        </div>

                    </div>
                </div>
            </div>
            <?php
    
include 'footer.php';
    
?>
    </body>

</html>