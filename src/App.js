import React,{Component} from 'react';
import Main from './Main';
import Header from './components/Header';
class App extends Component{
constructor(props){
  super(props);
  this.getEmail=this.getEmail.bind(this);
  this.state=({
    email:''
  })
}


getEmail=(e)=>{
  this.setState({email:e})
}

render(){
  return(
    <div>
    <Header get={this.getEmail}/>
    <Main email={this.state.email}/>
  </div>
  );
}
}

export default App;
