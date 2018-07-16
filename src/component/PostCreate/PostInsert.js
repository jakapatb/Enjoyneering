import React, {Component} from 'react';
import trim from 'trim';
import firebase from 'firebase';
class PostInsert extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.createpost = this.createpost.bind(this);
    this.state={
      title:'111',
      content:'222'

    };
  }

  onChange(e){
    const name = e.target.name
    this.setState({
      [name]:e.target.value
    });
  }

  createpost(){
    let firebaseRef = firebase.database().ref("Post");
    firebaseRef.push({
      title:this.state.title,
      content:this.state.content
    });
  }

  render() {
    return (
        <div class="col col-md-6">
          <h1>Create post</h1>
          <form >

            <div class="form-group">
              <label for="topic">Post Title:</label>
              <input type="text" class="form-control" id="topic"
                onChange={this.onChange} name="title"
              />
            </div>
            <div class="form-group">
              <label for="img-post">Image Title</label>
              <div class="custom-file">
                <input type="file" class="custom-file-input" id="img-post"/>
                <label class="custom-file-label" for="custom-file">Image Title</label>
              </div>

            </div>

            <div class="form-group">
              <label for="cotnent">content:</label>
              <textarea class="form-control" rows="10" id="content"
          onChange={this.onChange} name="content"></textarea>
            </div>
            <div class="form-group">

              <button type="submit" class="btn btn-primary" onClick={this.createpost}>submit</button>
            </div>
<h1>title:{this.state.title}</h1>
<h1>content:{this.state.content}</h1>
          </form>

        </div>
);
  }
}

export default PostInsert;
