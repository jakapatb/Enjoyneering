import React,{Component} from 'react';
import {database,storage} from '../../firebase';
class ConrouselItem extends Component{
  constructor(props){
    super(props);
    this.getMessage = this.getMessage.bind(this);
    this.getImage = this.getImage.bind(this);
    this.state={
      title:'',
      content:'',
      img:''
    }
  }

componentDidMount(){
  this.getMessage(this.props.item);
  this.getImage(this.props.item);
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

getImage(id){
  var sRef = storage.ref('Post/'+id+'/0');
  var path = sRef.fullPath;
  sRef.getDownloadURL().then((url)=>{
  this.setState({img:url});
}).catch((error)=>{
    console.log(error.message);
  });
}

checkIndex=()=>{
  if(this.props.index==0){
    return 'active';
  }
  else return null;
}
  render(){

    return(
      <div class={"carousel-item "+this.checkIndex()}>
        <a href="post"><img src={this.state.img} class=" img-responsive img-fluid" alt="test1" id="preview"/></a>
        <div class="carousel-caption">
          <h3>{this.state.title}</h3>
          <p>{this.state.content}</p>
        </div>
      </div>
    );
  }
}
export default ConrouselItem;
