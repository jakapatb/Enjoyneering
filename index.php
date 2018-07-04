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
</head>

<body>
    <?php
         include 'nav.php';
       ?>
        <div class="container">
            <div class="row bg-light">
                <!--left columns-->
                <div class="col col-md-8">
                    <!-- Top slide  -->
                    <div id="topCarousel" class="carousel slide " data-ride="carousel">
                        <!-- Indicators -->
                        <ul class="carousel-indicators">
                            <li data-target="#topCarousel" data-slide-to="0" class="active"></li>
                            <li data-target="#topCarousel" data-slide="1"></li>
                        </ul>
                        <!-- The slideshow -->
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <a href="post.php?topic=1"> <img src="img/test2.jpg" class=" img-responsive img-fluid" alt="test2"></a>
                                <div class="carousel-caption">
                                    <h3>Night Sky</h3>
                                    <p>far far away</p>
                                </div>
                            </div>
                            <div class="carousel-item ">
                                <a href="post.php?topic=2"><img src="img/test1.jpg" class=" img-responsive img-fluid" alt="test1"></a>
                                <div class="carousel-caption">
                                    <h3>Beach</h3>
                                    <p>just wait</p>
                                </div>
                            </div>
                        </div>

                        <!-- Left and right controls -->
                        <a class="carousel-control-prev" href="#topCarousel" data-slide="prev">
       <span class="carousel-control-prev-icon"></span>
   </a>
                        <a class="carousel-control-next" href="#topCarousel" data-slide="next">
       <span class="carousel-control-next-icon"></span>
   </a>

                    </div>
                    <br>
                    <!-- Top topics: -->
                    <div class="d-flex flex-row bg-dark">
                        <div class="p-2 bg-warning"> Enjoyneering Forum</div>
                    </div>


                    <!-- Card frame -->
                    <div class="content">
                        <br>
                        <div class="card-columns">
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


                    <!-- Top topics: -->
                    <div class="d-flex flex-row bg-dark">
                        <div class="p-2 bg-warning"> Enjoyneering Forum</div>
                    </div>
                    <!-- Card frame -->
                    <div class="content">
                        <br>
                        <div class="card-columns">
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

                <!-- Right columns-->
                <div class="col col-xl-4 bg-dark"></div>
            </div>
        </div>

        <?php
    
include 'footer.php';
    
?>
</body>

</html>