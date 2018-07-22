import React, {Component} from 'react';
import './littlepost.css';
import {Link} from 'react-router-dom';
import {database} from '../../firebase';
class LittlePost extends Component {
  constructor(props){
    super(props);
    this.db = database.ref().child('Post/'+props.id)
    this.state={
      title:'',
      content:''
    }
  }

componentDidMount(){
  this.db.on('value',snap =>{
    this.setState({
      title: snap.child('title').val(),
      content: snap.child('content').val(),
    })
    console.log("Little"+snap.val())
  }
);
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
          {this.state.id}
          <h4>  <Link to={"/post/"+this.props.id} class="nav-link">{this.state.title}</Link></h4>
          <p>{this.state.content}</p>

        </div>
      </div>

      </div>
    </div>
  );
  }

}
export default LittlePost;
