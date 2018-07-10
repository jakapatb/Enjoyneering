import React,{Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import LittlePost from './LittlePost/';



class Tag extends Component{


  render(){

    return(
      <div class="container">
<h2>Tags: Education</h2>
<LittlePost title="Night Sky" content="123"/>
<LittlePost title="Little Finger" content="456"/>
<LittlePost title="far far away" content="789"/>
      </div>
    );
  }
}


export default Tag;
