import React, {Component} from 'react';
import './littlepost.css';
import {Link} from 'react-router-dom';
import firebase from 'firebase';
class LittlePost extends Component {
  constructor(props){
    super(props);
    this.state={
      id:props.id,
      title:'',
      content:''
    }
  }

  render() {

    return (
      <div class="card mb-3">

      {/* Body */}
      <div class="row">
      <div class="col col-md-4"><img src="img/test2.jpg" alt="" class="img-fluid"/></div>
    <div class=" col">
        {/* left image */}

        {/* Right Content */}
        <div class="rightCon">
          <h4>  <Link to="/post" class="nav-link">{this.props.title}</Link></h4>
          <p>{this.props.content}</p>
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
