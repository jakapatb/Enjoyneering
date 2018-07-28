import React,{Component} from 'react';
import {database} from '../../firebase';
class ConrouselItem extends Component{
  constructor(props){
    super(props);
    this.getMessage = this.getMessage.bind(this);
    this.state={
      title:'',
      content:''
    }
  }

componentDidMount(){
  this.getMessage(this.props.item);
}

getMessage(id) {
  const Ref = database.ref('Post/'+id);
  Ref.on('value',snap =>{
    this.setState({
      title: snap.child('title').val(),
      content: snap.child('content/0/data').val()
    })
  })
}

checkIndex=()=>{
  if(this.props.index===0){
    return 'active';
  }
  else return null;
}
  render(){

    return(
      <div class={"carousel-item "+this.checkIndex()}>
        <a href="post"><img src="img/test1.jpg" class=" img-responsive img-fluid" alt="test1"/></a>
        <div class="carousel-caption">
          <h3>{this.state.title}</h3>
          <p>{this.state.content}</p>
        </div>
      </div>
    );
  }
}
export default ConrouselItem;
