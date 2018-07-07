import React,{Component} from 'react';

class Library extends Component{
render(){
  return(
    <div class="container">
{/*card columns */}
        <div class="card-deck">

            <div class="card">
                <img class="card-img-top img-fluid" src="img/education.jpg" alt="card"/>
                <div class="card-body ">
                    <h3 class="card-text">Coding</h3>
                    <button type="button" class="btn" data-toggle="collapse" data-target="#chapter">Chapter</button>
<div id="chapter" class="collapse">
<ul>
<li><a href="">1</a></li>
<li><a href="">2</a></li>
<li><a href="">3</a></li>

</ul>



</div>
                </div>
            </div>

            <div class="card">
                <img class="card-img-top img-fluid" src="img/education.jpg" alt="card"/>
                <div class="card-body ">
                    <h3 class="card-text">Coding</h3>


                </div>
            </div>

            <div class="card">
                <img class="card-img-top img-fluid" src="img/education.jpg" alt="card"/>
                <div class="card-body ">
                    <h3 class="card-text">Coding</h3>


                </div>
            </div>

        </div>
    </div>
  );
}


}
export default Library;
