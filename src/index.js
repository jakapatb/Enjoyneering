import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch ,Redirect } from "react-router-dom";
import thunk from "redux-thunk"; 
import { Provider } from "react-redux";
import indexRoutes from "routes/index.jsx";
import reducers from "configs/reducers/index.js"
import "assets/scss/material-kit-react.css?v=1.3.0";
import { createStore, applyMiddleware } from "redux";
import {checkAuth } from "actions/helpers.js";
import Components from "./views/Components/Components";
export var hist = createBrowserHistory();
const store = createStore(reducers, applyMiddleware(thunk));

checkAuth(store.dispatch).then(()=>{
  ReactDOM.render(
    <Provider store={store}>
      <Router history={hist}>
        <Switch>
          { 
            indexRoutes.map((prop, key) => {
              return !prop.private ? (
                <PublicRoute
                  path={prop.path}
                  key={key}
                  component={prop.component}
                />
              ) : (
                <PrivateRoute
                  path={prop.path}
                  key={key}
                  component={prop.component}
                />
              );
            })}
        </Switch>
      </Router>
    </Provider>,
    document.getElementById("root")
  );
})

const PrivateRoute = ({component:Component , ...rest}) => (
  <Route {...rest}
  render = {props => store.getState().auth.isAuth&&store.getState().auth.status!=="visitor" ? (<Component {...props}/>) 
  : (<Redirect to={
    {
      pathname: "/",
      state: {
        from: props.location
      }
    }
  }/>)}
  />
)

const PublicRoute = ({component:Component , ...rest}) => (
  <Route {...rest}
  render = {props => (<Component {...props}/>)}
  />)