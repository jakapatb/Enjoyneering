import React, {Component} from 'react';
import Comment from './Comment';
import './post.css';
class Post extends Component {
  constructor() {
    super();
    this.state={
      title:"Night Sky",
      tag:["Education","Life"],
      writer:"Jakkapat Boonroj",
      date:"5/7/2018 6:29"
    };
  }

tagList=()=>{

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

    return (<div class="container">
      <div>
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
        {/* Comment */}
        <div class="">
          <h2>Comment</h2>
          <Comment/>
          <Comment/>
        </div>

      </div>
    </div>);
  }
}
export default Post;
