import {Route} from 'react-router-dom';
import React,{Component} from 'react';
class RouteWithSubRoutes extends Component{
  render(){
    return(
    <Route
    path={this.props.path}

    render={props => (
      // pass the sub-routes down to keep nesting
      <this.props.component {...props} routes={this.props.routes} uid={this.props.uid}/>
    )}
  />);
}}
export default RouteWithSubRoutes;
