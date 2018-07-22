import Quiz from './components/Quiz';
import Homework from './components/Homework';
import Library from './components/Library/Library';
import Post from './components/Post/Post';
import PostCreate from './components/PostCreate/PostCreate';
import Profile from './components/Profile/Profile';
import EditProfile from './components/EditProfile';
import Tag from './components/Tag';
import Course from './components/Course/Course';
import Subject from './components/Subject/Subject';
const routes= [
  {
    path:'/quiz',
    component:Quiz,
  },
  {
    path:'/homework',
    component:Homework,
  },
  {
    path:'/library',
    component:Library,
  },
  {
    path:'/post-create',
    component:PostCreate,
  },
  {
    path:'/profile',
    component:Profile,
  },
  {
    path:'/edit-profile',
    component:EditProfile,
  },
  {
    path:'/tag/:article',
    component:Tag
  },
  {
    path:'/course',
    component:Course
  },
  {
    path:'/subject',
    component:Subject
  },
  {
    path:'/post/:article',
    component:Post,
  },
]
export default routes;
