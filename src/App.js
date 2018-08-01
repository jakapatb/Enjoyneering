import React,{Component} from 'react';
import Main from './Main';
import Header from './components/Header';
class App extends Component{
constructor(props){
  super(props);
  this.getUID=this.getUID.bind(this);
  this.state=({
    uid:''
  })
}


getUID=(e)=>{
  this.setState({...e})
}

render(){
  return(
    <div>
    <Header get={this.getUID}/>
      <Main uid={this.state}/>
  </div>
  );
}
}

export default App;
