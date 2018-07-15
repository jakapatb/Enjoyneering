import React, {Component} from 'react';
import trim from 'trim';
class PostInsert extends Component {
  constructor(props) {
    super(props);

    this.state={
      title:'',
      tag:[''],
      writer:'',
      date:'',
      message:''
    };
  }
  render() {
    return (
        <div class="col col-md-6">
          <h1>Create post</h1>
          <form action="#">

            <div class="form-group">
              <label for="topic">Post Title:</label>
              <input type="text" class="form-control" id="topic" placeholder="topic"/>
            </div>
            <div class="form-group">
              <label for="img-post">Image Title</label>
              <div class="custom-file">
                <input type="file" class="custom-file-input" id="img-post"/>
                <label class="custom-file-label" for="custom-file">Image Title</label>
              </div>

            </div>

            <div class="form-group">
              <label for="comment">Comment:</label>
              <textarea class="form-control" rows="10" id="comment" placeholder="comment"
          value={this.state.message}></textarea>
            </div>
            <div class="form-group">

              <button type="submit" class="btn btn-primary" onClick="createpost">submit</button>
            </div>

          </form>

        </div>
);
  }
}

export default PostInsert;
