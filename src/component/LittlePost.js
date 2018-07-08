import React, {Component} from 'react';

class LittlePost extends Component {
  render() {
    return (
      <div class="card mb-3">
      {/* Title */}
      <div class="card-header">
      <h4>  <a href="/post" class="nav-link">Night Sky </a></h4>
      </div>
      {/* Body */}
    <div class="card-body row">
        {/* left image */}
        <div class="col col-md-4"><img src="img/test2.jpg" alt="" class="img-fluid"/></div>
        {/* Right Content */}
        <div class="col ">
          <i class="fa fa-quote-left"></i>
          Permanence, perseverance and persistence in spite of all obstacles, discouragements, and impossibilities: It is this, that in all things distinguishes the strong soul from the weak.
          <i class="fa fa-quote-right"></i>
          <p class="lead text-primary">Thomas Carlyle</p>
          <p>hello world this is max,Im Newbie Web developer</p>
          <h3>This is test Topic 1</h3>
          <p>This is test content 1 and i dont know what to say anything,that so bored</p>

        </div>

      </div>
    </div>
  );
  }

}
export default LittlePost;
