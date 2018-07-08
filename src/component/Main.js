import React,{Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import Home from './Home';
import Quiz from './Quiz';
import Homework from './Homework';
import Library from './Library';
import Post from './Post';
import PostCreate from './PostCreate';
import Profile from './Profile';
import EditProfile from './EditProfile';
const Main = () => (
<main>
  <Switch>
    <Route exact path='/' component={Home}/>
    <Route path='/quiz' component={Quiz}/>
    <Route path='/homework' component={Homework}/>
    <Route path='/library' component={Library}/>
    <Route path='/post' component={Post}/>
    <Route path='/post-create' component={PostCreate}/>
    <Route path='/profile' component={Profile}/>
    <Route path='/edit-profile' component={EditProfile}/>
  </Switch>
</main>
)
export default Main
