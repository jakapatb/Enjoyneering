import React,{Component} from 'react';
import './subject.css';
class Subject extends Component{
  constructor(){
    super();
    this.state={
      title: 'Coding',
    };
  }
  render(){
    return(
      <div class="container-fluid">
      <img src="/img/test1.jpg" class="topImg" alt="don'tKnow"/>
      <div class="container">
        <h1>{this.state.title}</h1>
      </div>
      </div>
    );
  }
}
export default Subject;
