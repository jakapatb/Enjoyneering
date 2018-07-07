import React,{Component} from 'react';

class PostCreate extends Component{
  render(){
    return(
      <div class="container">

          <div class="row">
              {/* left columns */}
              <div class="col col-md-8">
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
                          <textarea class="form-control" rows="10" id="comment" placeholder="comment"></textarea>
                      </div>
                      <div class="form-group">

                          <button type="submit" class="btn btn-primary">submit</button>
                      </div>




                  </form>



              </div>
              {/* right columns */}
              <div class="col col-md-4 bg-secondary">

              </div>
          </div>

      </div>
    );
  }
}
export default PostCreate;
