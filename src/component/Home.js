import React, {Component} from 'react';
import LittlePost from './LittlePost';

import './home.css';
class Home extends Component {
  render() {
    return (<div class="container">
      <div class="bg-light">
        {/* left columns */}
        <div class="col">
          {/* Top slide */}
          <div id="topCarousel" class="carousel slide " data-ride="carousel">
            {/* Indicators */}
            <ul class="carousel-indicators">
              <li data-target="#topCarousel" data-slide-to="0" class="active"></li>
              <li data-target="#topCarousel" data-slide="1"></li>
            </ul>
            {/* The slideshow */}
            <div class="carousel-inner">
              <div class="carousel-item active">
                <a href="post">
                  <img src="img/test2.jpg" class=" img-responsive img-fluid" alt="test2"/></a>
                <div class="carousel-caption ">
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
          <br/> {/* Top topics: */}
          <div class="d-flex flex-row bg-dark">
            <div class="p-2 bg-warning">
              Latest Post</div>
          </div>

          {/* Card frame */}
          <div class="content">
            <br/> {/* Card:Education */}
            <LittlePost id="test"/>
            <LittlePost/>

          </div>

          {/* Top topics: */}
          <div class="d-flex flex-row bg-dark">
            <div class="p-2 bg-warning">
              Top Post</div>
          </div>
          {/* Card frame */}
          <div class="content">
            <br/>
            <LittlePost/>
            <LittlePost/>
          </div>

        </div>
      </div>
    </div>);
  }
}
export default Home;
