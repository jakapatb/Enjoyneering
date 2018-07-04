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
                    <h1>Create post</h1>
                    <form action="#">

                        <div class="form-group">
                            <label for="topic">Topic:</label>
                            <input type="text" class="form-control" id="topic" placeholder="topic">
                        </div>
                        <div class="form-group">
                            <label for="img-post">Image topic post</label>
                            <div class="custom-file">
                                <input type="file" class="custom-file-input" id="img-post">
                                <label class="custom-file-label" for="custom-file">Image topic</label>
                            </div>
                            
                        </div>
                        
                        <div class="form-group">
                            <label for="comment">Comment:</label>
                            <textarea class="form-control" rows="10" id="comment" placeholder="comment"></textarea>
                        </div>
                        <div class="form-group">
                            
                            <button type="submit" class="btn btn-primary">submit</button>
                        </div>
                        
                        
                        
                        
                    </form>



                </div>
                <!-- right columns -->
                <div class="col col-md-4 bg-secondary">

                </div>
            </div>

        </div>
</body>

</html>