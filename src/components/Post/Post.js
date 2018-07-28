import React, {Component} from 'react';
import Comment from './Comment';
import './post.css';
import RouteWithSubRoutes from '../../RouteWithSubRoutes';
import {database} from '../../firebase';
import {Link} from 'react-router-dom';
class Post extends Component {
  constructor(props) {
    super(props);
    this.getMessage = this.getMessage.bind(this);
    this.id = this.props.match.params.article
    this.routes = props.routes;
    this.state = {
      title: "",
      tag: [],
      writer: "",
      date: "",
      content: [],
      imgTopic: ''
    };
  }

  componentDidMount() {
    this.getMessage(this.id);
  }

  getMessage(id) {
    const Ref = database.ref('Post/' + id);
    const cRef = Ref.child('content');
    let arr = this.state.content
    Ref.on('value', snap => {
      this.setState({
        title: snap.child('title').val(),
        date: snap.child('date').val(),
    })
    })

    cRef.on('value', snap => {
      snap.forEach((childSnap) => {
        let add = [childSnap.val()];
        arr.push.apply(arr, add);
      })
    })
  }
  render() {
    var txt = [];
    var tag = this.state.tag;
    var x;
    for (x in tag) {
      txt[x] = <a href={tag[x]}>
        <span class="badge badge-dark">{tag[x]}</span>&nbsp;
      </a>

    }
    return (<div class="container-fluid">
      <img class="img-responsive img-fluid topImg" src={this.state.imgTopic} alt="Night sky"/>
      <div class="container">
        {/* Image Topic */}
        {/* Topic */}
        <Link to={"/post/"+this.props.match.params.article}>
          <h1>{this.state.title}</h1>
        </Link>
        <h5>Tag:{txt}
        </h5>
        <p>By: {this.state.writer}
          Date: {this.state.date}</p>
        {/* Content */}
        {
          this.state.content.map((element) => {
            if (element['type'] === 'subtitle') {
              return (<h2>{element['data']}</h2>);
            } else if (element['type'] === 'content') {
              return (<p>{element['data']}</p>);
            }
          })
        }

        {/* Quote */}
        {/* <div class="jumbotron">
          <h3 class="">
            <i class="fa fa-quote-left"></i>
            Permanence, perseverance and persistence in spite of all obstacles, discouragements, and impossibilities: It is this, that in all things distinguishes the strong soul from the weak.
            <i class="fa fa-quote-right"></i>
          </h3>
          <p class="lead text-primary">Thomas Carlyle</p>
        </div> */
        }
        {/* <p>hello world this is max,Im Newbie Web developer</p>
        <h2>This is test Topic 1</h2>
        <p>This is test content 1 and i dont know what to say anything,that so bored</p> */
        }

        {/* Comment */}
      </div>
      {/* <div class="container-fluid">
        <object class="youtube" data="https://www.youtube.com/embed/TTpMqSJ6poc" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></object>
        </div> */
      }
      <div class="container">
        <Comment id={this.id}/>
      </div>
      {this.routes.map((route, i) => (<RouteWithSubRoutes key={i} {...route}/>))}
    </div>);
  }
}
export default Post;
