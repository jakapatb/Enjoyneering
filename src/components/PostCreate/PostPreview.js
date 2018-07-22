import React, {Component} from 'react';


class PostPreview extends Component {
  constructor(props) {
    super(props);
    this.state={
      title:'',
      tag:[''],
      writer:'',
      date:'',
      message: 'This is test content 1 and i dont know what to say anything,that so bored'
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
    return (
        <div class="col  bg-secondary">
          <h1>Preview</h1>

          <img id="topImg" class="img-responsive img-fluid" src="img/test2.jpg" alt="Night sky"/>
          <a href="post.php?topic=1">
            <h1>{this.state.title}</h1>
          </a>

          <h5>By: {this.state.writer}</h5>
          <h5>Tag:{txt}
          </h5>

          <h5>Date: {this.state.date}</h5>
          {this.state.message}

  </div>
);
  }
}


export default PostPreview;
