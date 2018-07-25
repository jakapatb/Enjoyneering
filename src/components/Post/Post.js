import React, {Component} from 'react';
import Comment from './Comment';
import './post.css';
import RouteWithSubRoutes from '../../RouteWithSubRoutes';
import {database} from '../../firebase';


class Post extends Component {
  constructor(props) {
    super(props);
    this.db = database.ref().child('Post/'+this.props.match.params.article);
    this.routes = props.routes;
    this.state={
      title:"",
      tag:[],
      writer:"",
      date:"",
      content:''
    };
  }

componentDidMount(){

  this.db.on('value',snap =>{
    this.setState({
      title: snap.child('title').val(),
      content: snap.child('content').val(),
      writer: snap.child('writer').val(),
      date: snap.child('date').val(),
      tag: snap.child('tag').val()
    })
  }
);
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
    console.log(this.props.match.params.article)
    return (
      <div class="container-fluid">
      <img class="img-responsive img-fluid topImg" src="img/test2.jpg" alt="Night sky"/>
      <div class="container">
        {/* Image Topic */}
        {/* Topic */}
        <a href="/post?topic=1">
          <h1>{this.state.title}</h1>
        </a>
        <h5>Tag:{txt}
        </h5>
        <p>By: {this.state.writer} Date: {this.state.date}</p>
        {/* Content */}
        {this.state.content}

        {/* Quote */}
        {/* <div class="jumbotron">
          <h3 class="">
            <i class="fa fa-quote-left"></i>
            Permanence, perseverance and persistence in spite of all obstacles, discouragements, and impossibilities: It is this, that in all things distinguishes the strong soul from the weak.
            <i class="fa fa-quote-right"></i>
          </h3>
          <p class="lead text-primary">Thomas Carlyle</p>
        </div> */}
        {/* <p>hello world this is max,Im Newbie Web developer</p>
        <h2>This is test Topic 1</h2>
        <p>This is test content 1 and i dont know what to say anything,that so bored</p> */}

        {/* Comment */}
          </div>
        {/* <div class="container-fluid">
        <object class="youtube" data="https://www.youtube.com/embed/TTpMqSJ6poc" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></object>
        </div> */}
        <div class="container">
          <h2>Comment</h2>
          <Comment/>
          <Comment/>
        </div>
        {this.routes.map((route,i)=>(
          <RouteWithSubRoutes key={i} {...route} />
        ))}

    </div>);
  }
}
export default Post;
