import React,{Component} from 'react';

class Post extends Component{
render(){
return(
  <div class="container">
      <div class="row">
          {/* left columns */}
          <div class="col col-md-8">
              {/* Image Topic*/}
              <img class="img-fluid" src="img/test2.jpg" alt="Night sky"/>
              {/* Topic*/}
              <a href="post.php?topic=1">
                  <h1>Night Sky</h1>
              </a>
              {/* author */}
              <h5>By: Jakkapat Boonroj</h5>
              {/* Tag */}
              <h5>Tag:<span class="badge badge-dark">education</span>
                  <span class="badge badge-dark">life</span>
              </h5>
              {/* date/time */}
              <h5>Date: 5/7/2018 6:29</h5>
              {/* Quote */}
              <div class="jumbotron">
                  <h3 class=""> <i class="fa fa-quote-left"></i> Permanence, perseverance and persistence in spite of all obstacles, discouragements, and impossibilities: It is this, that in all things distinguishes the strong soul from the weak. <i class="fa fa-quote-right"></i> </h3>
                  <p class="lead text-primary">Thomas Carlyle</p>
              </div>
              {/*Content*/}
              <p>hello world this is max,Im Newbie Web developer</p>
              <h2>This is test Topic 1</h2>
              <p>This is test content 1 and i dont know what to say anything,that so bored</p>
              {/* Comment */}
              <div class="card-deck">
                <h2>Comment</h2>

              </div>


          </div>
          {/* right columns */}
          <div class="col col-md-4 bg-secondary">

          </div>
      </div>
  </div>
);
}
}
export default Post;
