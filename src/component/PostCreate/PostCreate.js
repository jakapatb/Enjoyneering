import React, {Component} from 'react';
import PostInsert from './PostInsert';
import PostPreview from './PostPreview';


class PostCreate extends Component {
  constructor(props) {
    super(props);

  }
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
