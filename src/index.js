import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import thunk from "redux-thunk"; 
import { Provider } from "react-redux";
import indexRoutes from "routes/index.jsx";
import reducers from "configs/reducers/index.js"
import "assets/scss/material-kit-react.css?v=1.3.0";
import { createStore, applyMiddleware } from "redux";
export var hist = createBrowserHistory();
const store = createStore(reducers, applyMiddleware(thunk));
ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        {indexRoutes.map((prop, key) => {
          return (
            <Route path={prop.path} key={key} component={prop.component} />
          );
        })}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
