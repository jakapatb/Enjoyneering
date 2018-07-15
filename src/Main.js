import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Home from './component/Home/Home';
import Quiz from './component/Quiz';
import Homework from './component/Homework';
import Library from './component/Library/Library';
import Post from './component/Post/Post';
import PostCreate from './component/PostCreate/PostCreate';
import Profile from './component/Profile/Profile';
import EditProfile from './component/EditProfile';
import Tag from './component/Tag';
import Cal from './component/Cal';
import Course from './component/Course/Course';
import Subject from './component/Subject/Subject';
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
    <Route path='/subject' component={Subject}/>
    <Route component={Notfound}/>
</Switch>
</main>
)
export default Main;
