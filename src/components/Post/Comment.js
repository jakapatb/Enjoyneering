import React,{Component} from 'react';
import './comment.css';
class Comment extends Component{
  constructor(){
    super();
    this.state={
      name:"Jakkapat Boonroj",
      time:"22 minute ago",
      content:"Thx guys. :)"
    };
  }
render(){
  return(
    <div class="card ">
<br/>
<p class="lead text-primary">
    <img src="img/59010187.jpg" class="rounded-circle float-left comment" alt="profile"/>{this.state.name}<br/>{this.state.time}</p>
    <p>{this.state.content}</p>
    </div>
  );
}

}
export default Comment;
