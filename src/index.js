import React from 'react';
import ReactDOM from 'react-dom';
import Header from './component/Header';
import App from './component/App';

import {BrowserRouter,Route} from 'react-router-dom';


ReactDOM.render(
<BrowserRouter>
<App/>
</BrowserRouter>
,document.getElementById('root')
);
