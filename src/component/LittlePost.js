import React, {Component} from 'react';
import './littlepost.css';
import {Link} from 'react-router-dom';
class LittlePost extends Component {
  render() {
    return (
      <div class="card mb-3">
      {/* Body */}
      <div class="row">
      <div class="col col-md-4"><img src="img/test2.jpg" alt="" class="img-fluid"/></div>
    <div class=" col">
        {/* left image */}

        {/* Right Content */}
        <div class="">
          <h4>  <Link to="/post" class="nav-link">Night Sky </Link></h4>
          <i class="fa fa-quote-left"></i>
          Permanence, perseverance and persistence in spite of all obstacles, discouragements, and impossibilities: It is this, that in all things distinguishes the strong soul from the weak.
          <i class="fa fa-quote-right"></i>
          <p class="lead text-primary">Thomas Carlyle</p>
          <p>hello world this is max,Im Newbie Web developer</p>

        </div>
      </div>

      </div>
    </div>
  );
  }

}
export default LittlePost;
