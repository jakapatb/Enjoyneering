<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Forum page</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>

<body>
    <!-- Top menu bar -->
    <?php
         include 'nav.php';
       ?>

        <div class="container">
            <div class="row">
                <!-- left columns -->
                <div class="col col-md-8">
                    <!-- Image Topic-->
                    <img class="img-fluid" src="img/test2.jpg" alt="Night sky">
                    <!-- Topic-->
                    <a href="post.php?topic=1">
                        <h1>Night Sky</h1>
                    </a>
                    <!-- Quote -->
                    <div class="jumbotron">
                        <h1 class="display-4"> <i class="fa fa-quote-left"></i> far far away <i class="fa fa-quote-right"></i> </h1>
                        <p class="lead">Jakapat Boonroj said</p>
                    </div>
                    <!--Content-->
                    <p>hello world this is max,I'm Newbie Web developer</p>
                    <h2>This is test Topic 1</h2>
                    <P>This is test content 1 and i don't know what to say anything,that so bored</P>

                </div>
                <!-- right columns -->
                <div class="col col-md-4 bg-secondary">

                </div>
            </div>
        </div>
</body>

</html>