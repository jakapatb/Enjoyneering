import React, {Component} from 'react';
import CommentCard from './CommentCard';
import './comment.css';
import {database} from '../../firebase';
var moment = require('moment');
class Comment extends Component {
  constructor(props) {
    super(props);
    this.postId = this.props.id;
    this.getMessage = this.getMessage.bind(this);
    this.changeComment = this.changeComment.bind(this);
    this.createComment = this.createComment.bind(this);
    this.state = {
      comment: [],
      value:''
    };
  }

  componentDidMount() {
    this.getMessage(this.postId);
  }

  getMessage(id) {
    const Ref = database.ref('Post/' + id);
    const cRef = Ref.child('comment');
    let arr = this.state.comment
    cRef.on('child_added', snap => {
      arr.push(snap.val());
    })
  }


  changeComment=(e)=>{
    this.setState({
      value:e.target.value
    });
  }

  createComment=(e)=>{
    const Ref = database.ref('Post/' + this.postId);
    const cRef = Ref.child('comment');
    let time = new Date;
    if(this.state.value!==''){
    cRef.push({
      name:this.props.uid.data.username,
      content:this.state.value,
      date:time.getTime()
    });}
     e.preventDefault();
  }

  render() {
    return (<div class="card">
      <div class="card-header d-flex bg-dark">
        <div class="p-2 text-light">
          <h3>{this.state.comment.length}
            Comments</h3>
        </div>
        <div class="p-2 ml-auto">
          <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">comment</button>
        </div>
      </div>
      <div class="collapse" id="collapseExample">
        {/* Hidden Post Comment */}
        <div class="card card-body">

        {/*Form Comment*/}
          <form onSubmit={this.createComment} id="commentform">
          <h5>Comment:</h5>
          <textarea class="form-control" rows="3" id="comment" onChange={this.changeComment} form="commentform"></textarea>
          <button class="btn btn-primary btn-ml" type="submit" value="Submit">Post Comment</button>
        </form>

        </div>
      </div>

      {
        this.state.comment.map((data) =>< CommentCard item = {
          data
        } />)
      }

    </div>);
  }

}
export default Comment;
