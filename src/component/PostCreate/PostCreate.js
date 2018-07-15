import React, {Component} from 'react';
import PostInsert from './PostInsert';
import PostPreview from './PostPreview';
import firebase from 'firebase';

class PostCreate extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<div class="container-fluid">

      <div class="row">
        <PostInsert db={firebase}/>
        <PostPreview db={firebase}/>
      </div>
    </div>);
  }
}

export default PostCreate;
