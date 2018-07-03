<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>library</title>
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
<!--card columns -->
            <div class="card-deck">
               
                <div class="card">
                    <img class="card-img-top img-fluid" src="img/education.jpg" alt="card">
                    <div class="card-body ">
                        <h3 class="card-text">Coding</h3>
                        <button type="button" class="btn" data-toggle="collapse" data-target="#chapter">Chapter</button>
<div id="chapter" class="collapse">
<ul>
    <li><a href="">1</a></li>
    <li><a href="">2</a></li>
    <li><a href="">3</a></li>

</ul>
    
    
    
</div>
                    </div>
                </div>
                               
                <div class="card">
                    <img class="card-img-top img-fluid" src="img/education.jpg" alt="card">
                    <div class="card-body ">
                        <h3 class="card-text">Coding</h3>


                    </div>
                </div>
                               
                <div class="card">
                    <img class="card-img-top img-fluid" src="img/education.jpg" alt="card">
                    <div class="card-body ">
                        <h3 class="card-text">Coding</h3>


                    </div>
                </div>
                
            </div>
        </div>
</body>

</html>