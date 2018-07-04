<!-- Top menu bar 
      **This for include to any page
-->
<nav class="navbar navbar-expand-md bg-dark navbar-dark ">
    <a class="navbar-brand" href="index.php">Enjoyneering</a>
    <button type="button" data-toggle="collapse" data-target="#demo" class="navbar-toggler btn btn-dark border border-secondary btn-sm"><span class="navbar-toggler-icon"></span></button>

    <div class="collapse navbar-collapse" id="demo">
        <!-- left menu -->
        <ul class="navbar-nav mr-auto">

            <!-- Education dropdown-->
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="education.php" id="navbardrop" data-toggle="dropdown">Education</a>
                <div class="dropdown-menu">
                    <a class="dropdown-item" href="quiz.php">Quiz</a>
                    <a class="dropdown-item" href="homework.php">Homework</a>
                    <a class="dropdown-item" href="library.php">Library</a>
                </div>
            </li>
            <!-- forum -->
            <li class="nav-item"><a class="nav-link" href="foum.php">Forum</a></li>
        </ul>
        <!-- right menu -->
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <a class="nav-link" data-toggle="modal" data-target="#login">Login</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="modal" data-target="#signup">Sign up</a>
            </li>
        </ul>
    </div>


</nav>
<br>

<!--Login Popup-->
<div class="modal fade" id="login" tabindex="-1" role="dialog" aria-labelledby="loginLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h1>Login</h1>

            </div>
            <!--TODO : creat new php page for login -->
            <form action="config/action_register.php">
                <div class="modal-body">

                    <div class="form-group">
                        <label for="usr">Username:</label>
                        <input type="text" class="form-control" id="usr">
                    </div>
                    <div class="form-group">
                        <label for="usr">Password:</label>
                        <input type="text" class="form-control" id="pwd">
                    </div>

                </div>
                <div class="modal-footer">
                    <a class=" mr-auto btn btn-primary text-light" data-toggle="modal" data-dismiss="modal" data-target="#signup">Sign up</a>
                    <button type="button" class="btn btn-light " data-dismiss="modal">Cancel</button>
                    <button type="submit" class=" btn btn-primary">Log in</button>
                </div>
            </form>

        </div>
    </div>


</div>

<!--Sign up Popup-->
<div class="modal fade" id="signup" tabindex="-1" role="dialog" aria-labelledby="loginLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h1>Sign up</h1>

            </div>
            <!--TODO : creat new php page for create account -->
            <form action="config/action_register.php">
                <div class="modal-body">

                    <div class="form-group">
                        <label for="usr">Username:</label>
                        <input type="text" class="form-control" id="usr">
                    </div>
                    <div class="form-group">
                        <label for="usr">Email address:</label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Your Email" id="email">
                            <div class="input-group-append"><span class="input-group-text">@example.com</span></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="usr">Create password:</label>
                        <input type="text" class="form-control" id="pwd">
                    </div>
                    <div class="form-group">
                        <label for="usr">Confirm password:</label>
                        <input type="text" class="form-control" id="pwd2">
                    </div>
                </div>
                <div class="modal-footer">
                    <a class=" mr-auto btn btn-primary text-light" data-toggle="modal" data-dismiss="modal" data-target="#login" >Login</a>
                    <button type="button" class="btn btn-light " data-dismiss="modal">Cancel</button>
                    <button type="submit" class=" btn btn-primary">Sign up</button>
                </div>
            </form>

        </div>
    </div>


</div>