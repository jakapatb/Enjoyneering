import React, {Component} from 'react';
import PostInsert from './PostInsert';
import PostPreview from './PostPreview';


class PostCreate extends Component {

  render() {
    return (<div class="container-fluid">

      <div class="row">
        <PostInsert />
        <PostPreview/>
      </div>
    </div>);
  }
}

export default PostCreate;
