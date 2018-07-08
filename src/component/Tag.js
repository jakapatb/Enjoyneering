import React,{Component} from 'react';
import LittlePost from './LittlePost';
class Tag extends Component{
  render(){

    return(
      <div class="container">
<h2>Tag:<a href="/tag#education"><span class="badge badge-dark">Education</span></a></h2>
<LittlePost/>
<LittlePost/>
<LittlePost/>

      </div>
    );
  }
}
export default Tag;
