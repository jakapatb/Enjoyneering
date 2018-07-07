import React,{Component} from 'react';

class Home extends Component{
  render(){
    return(
      <div class="container">
          <div class="row bg-light">
              {/*left columns*/}
              <div class="col col-md-8">
                  {/* Top slide  */}
                  <div id="topCarousel" class="carousel slide " data-ride="carousel">
                      {/* Indicators */}
                      <ul class="carousel-indicators">
                          <li data-target="#topCarousel" data-slide-to="0" class="active"></li>
                          <li data-target="#topCarousel" data-slide="1"></li>
                      </ul>
                      {/* The slideshow */}
                      <div class="carousel-inner">
                          <div class="carousel-item active">
                              <a href="post"> <img src="img/test2.jpg" class=" img-responsive img-fluid" alt="test2"/></a>
                              <div class="carousel-caption">
                                  <h3>Night Sky</h3>
                                  <p>Permanence, perseverance and persistence in spite of all obstacles, discouragements, and impossibilities: It is this, that in all things distinguishes the strong soul from the weak.</p>
                              </div>
                          </div>
                          <div class="carousel-item ">
                              <a href="post"><img src="img/test1.jpg" class=" img-responsive img-fluid" alt="test1"/></a>
                              <div class="carousel-caption">
                                  <h3>Napoleon Hill</h3>
                                  <p>If you cannot do great things, do small things in a great way.</p>
                              </div>
                          </div>
                      </div>

                      {/* Left and right controls */}
                      <a class="carousel-control-prev" href="#topCarousel" data-slide="prev">
     <span class="carousel-control-prev-icon"></span>
    </a>
                      <a class="carousel-control-next" href="#topCarousel" data-slide="next">
     <span class="carousel-control-next-icon"></span>
    </a>

                  </div>
                  <br/>
                  {/* Top topics: */}
                  <div class="d-flex flex-row bg-dark">
                      <div class="p-2 bg-warning"> Enjoyneering Forum</div>
                  </div>


                  {/* Card frame */}
                  <div class="content">
                      <br/>
                      <div class="card-columns">
                          {/*Card:Education */}
                          <div class="card">
                              <img src="img/education.jpg" class="img-fluid" alt="Education"/>


                              <div class="card-body">
                                  <h1 class="card-title">Education</h1>
                                  <h5 class="card-subtitle">Education page</h5>
                                  <p>This for Education</p>

                              </div>

                              <div class="card-footer"><a class="btn btn-dark float-right btn-sm" href="education.php">Education page...</a></div>
                          </div>
                          {/*Card:Forum */}
                          <div class="card">

                              <img src="img/forum.jpg" class="img-fluid" alt="forum"/>
                              <div class="card-body">
                                  <br/>
                                  <h1 class="card-title">Forum</h1>
                                  <h5 class="card-subtitle">forum page</h5>
                                  <p>This for forum</p>
                              </div>
                              <div class="card-footer"> <a class="btn btn-dark  btn-sm float-right" href="foum.php">forum page...</a> </div>

                          </div>
                          {/*Card:Forum */}
                          <div class="card">

                              <img src="img/forum.jpg" class="img-fluid" alt="forum"/>
                              <div class="card-body">
                                  <br/>
                                  <h1 class="card-title">Forum</h1>
                                  <h5 class="card-subtitle">forum page</h5>
                                  <p>This for forum</p>
                              </div>
                              <div class="card-footer"> <a class="btn btn-dark  btn-sm float-right" href="foum.php">forum page...</a> </div>

                          </div>

                      </div>
                  </div>


                  {/* Top topics: */}
                  <div class="d-flex flex-row bg-dark">
                      <div class="p-2 bg-warning"> Enjoyneering Forum</div>
                  </div>
                  {/* Card frame */}
                  <div class="content">
                      <br/>
                      <div class="card-columns">
                          {/*Card:Education */}
                          <div class="card">
                              <img src="img/education.jpg" class="img-fluid" alt="Education"/>


                              <div class="card-body">
                                  <h1 class="card-title">Education</h1>
                                  <h5 class="card-subtitle">Education page</h5>
                                  <p>This for Education</p>

                              </div>

                              <div class="card-footer"><a class="btn btn-dark float-right btn-sm" href="education.php">Education page...</a></div>
                          </div>
                          {/*Card:Forum */}
                          <div class="card">

                              <img src="img/forum.jpg" class="img-fluid" alt="forum"/>
                              <div class="card-body">
                                  <br/>
                                  <h1 class="card-title">Forum</h1>
                                  <h5 class="card-subtitle">forum page</h5>
                                  <p>This for forum</p>
                              </div>
                              <div class="card-footer"> <a class="btn btn-dark  btn-sm float-right" href="foum.php">forum page...</a> </div>

                          </div>
                          {/*Card:Forum */}
                          <div class="card">

                              <img src="img/forum.jpg" class="img-fluid" alt="forum"/>
                              <div class="card-body">
                                  <br/>
                                  <h1 class="card-title">Forum</h1>
                                  <h5 class="card-subtitle">forum page</h5>
                                  <p>This for forum</p>
                              </div>
                              <div class="card-footer"> <a class="btn btn-dark  btn-sm float-right" href="foum.php">forum page...</a> </div>

                          </div>

                      </div>
                  </div>


              </div>

              {/* Right columns*/}
              <div class="col col-xl-4 bg-dark">


              </div>
          </div>
      </div>
    );
  }
}
export default Home;
