import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Home from './Home/Home';
import Quiz from './Quiz';
import Homework from './Homework';
import Library from './Library';
import Post from './Post/Post';
import PostCreate from './PostCreate';
import Profile from './Profile/Profile';
import EditProfile from './EditProfile';
import Tag from './Tag';
import Cal from './Cal';
import Course from './Course/Course';

const Notfound= () => <h1>404 Not Found :(</h1>
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
    <Route path='/tag' component={Tag}/>
    <Route path='/calendar' component={Cal}/>
    <Route path='/course' component={Course}/>
    <Route component={Notfound}/>
</Switch>
</main>
)
export default Main;
