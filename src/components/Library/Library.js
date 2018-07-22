import React,{Component} from 'react';
import LittleLibrary from './LittleLibrary';
class Library extends Component{
render(){
  return(
    <div class="container">
      <h1>Library</h1>
      <a href="#database" class="btn border btn-block" data-toggle="collapse"><h3>Database</h3></a>
      <div class="card-deck collapse" id="database">
        <LittleLibrary title="database-Chapter1"/>
        <LittleLibrary title="database-Chapter2"/>
        <LittleLibrary title="database-Chapter3"/>
      </div>
      <br/>
      <a href="#database2" class="btn border btn-block" data-toggle="collapse"><h3>Coding</h3></a>
      <div class="card-deck collapse" id="database2">
        <LittleLibrary title="coding-Chapter1"/>
        <LittleLibrary title="coding-Chapter2"/>
        <LittleLibrary title="coding-Chapter3"/>
      </div>



    </div>
  );
}


}
export default Library;
