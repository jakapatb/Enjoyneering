import Quiz from './components/Quiz';
import Homework from './components/Homework';
import Library from './components/Library/Library';
import Post from './components/Post/Post';
import PostCreate from './components/PostCreate/PostCreate';
import Profile from './components/Profile/Profile';
import EditProfile from './components/EditProfile';
import Tag from './components/Search/Tag';
import Course from './components/Course/Course';
import Subject from './components/Subject/Subject';
import Search from './components/Search/Search';
import PostEdit from './components/PostEdit/PostEdit';

const routes = [
  {
    path: '/quiz',
    component: Quiz
  }, {
    path: '/homework',
    component: Homework
  }, {
    path: '/library',
    component: Library
  }, {
    path: '/post-create',
    component: PostCreate
  }, {
    path: '/profile',
    component: Profile
  }, {
    path: '/edit-profile',
    component: EditProfile
  }, {
    path: '/search',
    component: Search,
    routes:[
      {
         path: '/search/:article',
         component: Tag,
      }
    ]
  }, {
    path: '/course',
    component: Course,
    routes:[]
  }, {
    path: '/subject',
    component: Subject,
    routes:[]
  }, {
    path: '/post/:article',
    component: Post,
    routes:[]
  }, {
    path: '/post-edit/:article',
    component: PostEdit,
    routes:[]
  }
]
export default routes;
