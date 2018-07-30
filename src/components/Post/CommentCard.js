import React,{Component} from 'react';
import './comment.css';
var moment = require('moment');
class CommentCard extends Component{
  constructor(props){
    super(props);
    this.state={
      name:'',
      date:'',
      content:''
    };
  }
  componentDidMount(){
  this.setState({
    ...this.props.item
  })
  }
render(){
  return(
    <div class="card">
<div class="card-body">
<p class="lead text-primary">
    <img src="img/59010187.jpg" class="rounded-circle float-left comment" alt="profile"/>{this.state.name}<br/>{moment(this.state.date,'MMMM Do YYYY, h:mm:ss a').fromNow()}</p>
    <p>{this.state.content}</p>
    </div>
  </div>
  );
}

}
export default CommentCard;
