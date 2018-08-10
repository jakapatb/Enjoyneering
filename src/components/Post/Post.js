import React, {Component} from 'react';
import Comment from './Comment';
import './post.css';
import RouteWithSubRoutes from '../../RouteWithSubRoutes';
import {database,storage} from '../../firebase';
import {Link} from 'react-router-dom';
var moment = require('moment');
class Post extends Component {
  constructor(props) {
    super(props);
    this.getMessage = this.getMessage.bind(this);
    // this.counstView = this.counstView.bind(this);
    this.id = this.props.match.params.article
    this.routes = props.routes;
    this.state = {
      title: "",
      tag: [],
      writer: "",
      date: "",
      content: [],
      imgTopic: '',
      view:0
    };
  }

  componentDidMount() {
    this.getMessage(this.id);
  }

  // counstView(id){
  //   console.log("before:"+this.state.view);
  //   const Ref = database.ref('Post/' + id);
  //   let count ={};
  //   let index = 9
  //   count['/view']=index++;
  //   Ref.update(count);
  //   this.setState({view:index});
  //   console.log("after:"+this.state.view);
  // }

  getMessage(id) {
    const Ref = database.ref('Post/' + id);
    const cRef = Ref.child('content');
    let arr = this.state.content;
    Ref.on('value', snap => {
      this.setState({title: snap.child('title').val(), date: snap.child('date').val(),writer: snap.child('writer').val(), tag: snap.child('tag').val(), view: snap.child('view').val()})
    })

    cRef.on('value', snap => {
      snap.forEach((childSnap) => {
        let add = [childSnap.val()];
        arr.push.apply(arr, add);
      })
    })
  }

  showImage(index,data){
    var preview=document.getElementById('image'+index);
     var sRef = storage.ref('Post/'+this.id+'/'+data);
  //  var sRef = storage.ref('Picture1500344731568.JPEG');

    sRef.getDownloadURL().then(function(url) {
              preview.src = url;
              }).catch(function(error) {
                console.log(error.message);
              });
  }

  render() {
    var {
      tag
    } = this.state;
    return (<div class="container-fluid">

        {this.showImage(0,0)}
      <img src='' class="rounded mx-auto d-block img-responsive img-fluid topImg" height="200" alt="preview..." id="image0"/>
      <div class="container">
        {/* Topic */}
        <div class="border rounded">

            <h1><Link to={"/post/" + this.props.match.params.article} class="nav-link">{this.state.title}</Link></h1>
            <i class="material-icons">credit_card</i>

          <h5>Tag:{
              tag.map((elem =><Link to = {
                "../search?tag=" + elem
              } > <span class="badge badge-dark">{elem}</span>
            </Link>))

            }
          </h5>
          <h5>By: {this.state.writer}<br/>
            Date: {moment(this.state.date).fromNow()}</h5>
        </div>
        {/* Content */}
        <div class="content">
          {
            this.state.content.map((element,i) => {
              if (element['type'] === 'subtitle') {
                return (<h2>{element['data']}</h2>);
              } else if (element['type'] === 'content') {
                return (<p>{element['data']}</p>);
              }
              else if (element['type'] === 'imgTopic') {
                if(i===0){
                  return false;
                }
                let temp =element['data']
                this.showImage(i,temp)
                return(
                  <img src='' class="rounded mx-auto d-block img-responsive img-fluid topImg" height="200" alt="preview" id={"image"+(i)}/>
              );
              }
              else
              return false;
            })
          }
        </div>
      </div>
      <div class="container">
        <Comment id={this.id} uid={this.props.uid}/>
      </div>
      {this.routes.map((route, i) => (<RouteWithSubRoutes key={i} {...route}/>))}
    </div>);
  }
}
export default Post;
