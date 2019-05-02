import Components from "views/Components/Components.jsx";
import LandingPage from "views/LandingPage/LandingPage.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";
import CreatePost from "views/CreatePost/CreatePost.jsx";
import SearchPage from "views/SearchPage/SearchPage.jsx";
import Management from "views/Management/Management.jsx";  

var indexRoutes = [
  {
    path: "/landing-page/:post",
    name: "LandingPage",
    component: LandingPage,
    private: false
  },
  {
    path: "/login-page",
    name: "LoginPage",
    component: LoginPage,
    private: false
  },
  {
    path: "/create-post",
    name: "CreatePost",
    component: CreatePost,
    private: true
  },
  {
    path: "/search",
    name: "SearchPage",
    component: SearchPage,
    private: false
  },
  {
    path: "/management/:active(classroom|profile)",
    name: "Management",
    component: Management,
    private: false
  },
  {
    path: "/management",
    name: "Management",
    component: Management,
    private: false
  },
  {
    path: "/management/profile/:uid",
    name: "Management",
    component: Management,
    private: false
  },
  { path: "/", name: "Components", component: Components, private: false }
];

export default indexRoutes;