import React,{Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import Home from './components/Home/Home';
import routes from './routes';
import RouteWithSubRoutes from './RouteWithSubRoutes';

const Notfound= () => <h1>404 Not Found :(</h1>
class Main extends Component{
  constructor(props){
    super(props);
  }

render(){
  return(
<main>
  <Switch>
    <Route exact path='/' component={Home}/>
    {
      routes.map((route,i)=>(
      <RouteWithSubRoutes key={i} {...route} email={this.props.email}/>
    ))}
    <Route component={Notfound}/>
</Switch>
</main>
);
}}
export default Main;
