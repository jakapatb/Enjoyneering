import {Route} from 'react-router-dom';
import React,{Component} from 'react';
import routes from './routes';
class RouteWithSubRoutes extends Component{
  constructor(props){
    super(props)
  }


  render(){
    return(
    <Route
    path={this.props.path}

    render={props => (
      // pass the sub-routes down to keep nesting
      <this.props.component {...props} routes={this.props.routes} email={this.props.email}/>
    )}
  />);
}}
export default RouteWithSubRoutes;
