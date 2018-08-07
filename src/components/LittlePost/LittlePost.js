import React, {Component} from 'react';
import './littlepost.css';
import {Link} from 'react-router-dom';
import {database,storage} from '../../firebase';
var moment = require('moment');
class LittlePost extends Component {
  constructor(props){
    super(props);
    this.getMessage = this.getMessage.bind(this);
    this.state={
      title:'',
      date:'',
      comment:'',
      content:'',
      img:''
    }
  }

componentDidMount(){
  this.getMessage(this.props.id,this.state);
}
componentWillReceiveProps(nextProps) {
  if(nextProps.id!== this.props.id){
  this.setState({...nextProps})
  this.getMessage(nextProps.id,this.state);
}
}
getMessage(id,state) {
  const Ref = database.ref('Post/'+id);
  Ref.on('value',snap =>{
    this.setState({
      title: snap.child('title').val(),
      date: snap.child('date').val(),
      comment:snap.child('comment').val(),
      content: snap.child('content/1/data').val(),
      img:snap.child('content/0/data').val()
    })
  })
            var sRef = storage.ref('Post/'+this.props.id+'/0');
            var path = sRef.fullPath;
            sRef.getDownloadURL().then((url)=>{
            this.setState({img:url});
            }).catch(function(error) {
              console.log(error.message);
            });
}



  render() {
    if(this.state.comment!=null){
      this.index = Object.keys(this.state.comment).length;
    }
          else {
      this.index =0;
    }
    return (
      <div class="card mb-3">
      {/* Body */}
      <div class="row">
      <div class="col col-md-4"><img src={this.state.img} alt="" class="img-fluid" id="topic"/></div>
    <div class=" col">
        {/* left image */}

        {/* Right Content */}
        <div class="rightCon">
          <h4>  <Link to={"/post/"+this.props.id} class="nav-link">{this.state.title}</Link></h4>
          <p>{this.state.content}</p>
          {moment(this.state.date).fromNow()}
        {
          <h5>{this.index} Comments</h5>}
        </div>
      </div>

      </div>
    </div>
  );
  }

}
export default LittlePost;
