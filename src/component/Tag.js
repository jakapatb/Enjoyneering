import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import LittlePost from './LittlePost/';

class Tag extends Component {
  constructor() {
    super();
    this.state = {
      head: ["Education"]
    }
  }

  render() {
    var txt=[];

    var x;
    for(x in this.state.head){
      var link="/tag/"+this.state.head[x];
      txt[x]=<a href={link}>
      <span class="badge badge-dark">{this.state.head[x]}</span>&nbsp;
    </a>
    }
    return (<div class="container">
      <h2>Tags: {txt}</h2>
      <LittlePost title="Night Sky" content="123"/>
      <LittlePost title="Little Finger" content="456"/>
      <LittlePost title="far far away" content="789"/>
    </div>);
  }
}

export default Tag;
