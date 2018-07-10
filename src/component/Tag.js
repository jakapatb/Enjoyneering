import React,{Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import LittlePost from './LittlePost';



class Tag extends Component{
  render(){

    return(
      <div class="container">
<h2>Tags: Education</h2>
<LittlePost/>
      </div>
    );
  }
}


export default Tag;
