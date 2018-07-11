import React, {Component} from 'react';
import Post from './Post/';
class PostCreate extends Component {

  constructor() {
    super();
    this.state={
      title:"Night Sky",
      tag:["Education","Life"],
      writer:"Jakkapat Boonroj",
      date:"5/7/2018 6:29"
    };
  }
  render() {

    var txt=[];
    var tag=this.state.tag;
    var x;
    for(x in tag){
      txt[x]=<a href={tag[x]} >
      <span class="badge badge-dark">{tag[x]}</span>&nbsp;
    </a>

    }

    return (<div class="container-fluid">

      <div class="row">
        {/* left columns */}
        <div class="col col-md-6">
          <h1>Create post</h1>
          <form action="#">

            <div class="form-group">
              <label for="topic">Post Title:</label>
              <input type="text" class="form-control" id="topic" placeholder="topic"/>
            </div>
            <div class="form-group">
              <label for="img-post">Image Title</label>
              <div class="custom-file">
                <input type="file" class="custom-file-input" id="img-post"/>
                <label class="custom-file-label" for="custom-file">Image Title</label>
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
        {/* right columns */}
        <div class="col  bg-secondary">
          <h1>Preview</h1>
          {/* Image Topic */}
          <img id="topImg" class="img-responsive img-fluid" src="img/test2.jpg" alt="Night sky"/> {/* Topic */}
          <a href="post.php?topic=1">
            <h1>{this.state.title}</h1>
          </a>
          {/* author */}
          <h5>By: {this.state.writer}</h5>
          {/* Tag */}
          <h5>Tag:{txt}
          </h5>
          {/* date/time */}
          <h5>Date: {this.state.date}</h5>
          {/* Quote */}
          <div class="jumbotron">
            <h3 class="">
              <i class="fa fa-quote-left"></i>
              Permanence, perseverance and persistence in spite of all obstacles, discouragements, and impossibilities: It is this, that in all things distinguishes the strong soul from the weak.
              <i class="fa fa-quote-right"></i>
            </h3>
            <p class="lead text-primary">Thomas Carlyle</p>
          </div>
          {/* Content */}
          <p>hello world this is max,Im Newbie Web developer</p>
          <h2>This is test Topic 1</h2>
          <p>This is test content 1 and i dont know what to say anything,that so bored</p>
  </div>
</div>
</div>
);
  }
}

export default PostCreate;
