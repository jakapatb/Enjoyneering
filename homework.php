<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Homework</title>
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
            <h1>Homework <span class="badge badge-success">5/8</span></h1>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Subject</th>
                        <th>Title</th>
                        <th>Sec</th>
                        <th>Date/Time</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr data-toggle="modal" data-target="#homework">
                        <td>1</td>
                        <td>Coding</td>
                        <td>การบ้าน</td>
                        <td>21</td>
                        <td>6/7/2018</td>
                        <td>Not done</td>
                    </tr>
                </tbody>



            </table>

            <div class="modal fade" id="homework" tabindex="-1" role="dialog" aria-labelledby="loginLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1>Homework:Coding</h1>
                        </div>
                        <div class="modal-body">
                            <p>information</p>
                            <img class="img-fluid" src="img/forum.jpg">
                        </div>
                        <form action="config/action_homework.php">
                            <div class="modal-footer">
                                <div class="custom-file">
                                    <input type="file" class="custom-file-input" id="homework_file">
                                    <label class="custom-file-label" for="customFile">Send Homework</label>
                                </div>
                                <button type="submit" class="btn btn-primary">Submit
                       </button>
                            </div>
                        </form>
                    </div>


                </div>

            </div>



        </div>
</body>

</html>