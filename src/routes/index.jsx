import Components from "views/Components/Components.jsx";
import LandingPage from "views/LandingPage/LandingPage.jsx";
import ProfilePage from "views/ProfilePage/ProfilePage.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";
import CreatePost from "views/CreatePost/CreatePost";
import SearchPage from "views/SearchPage/SearchPage";
import Management from "views/Management/Management.jsx";
var indexRoutes = [
  { path: "/landing-page", name: "LandingPage", component: LandingPage },
  { path: "/profile-page", name: "ProfilePage", component: ProfilePage },
  { path: "/login-page", name: "LoginPage", component: LoginPage },
  { path: "/create-post",name:"CreatePost", component:CreatePost},
  { path: "/search" , name:"SearchPage" , component:SearchPage},
  { path: "/management", name:"Management" , component:Management},
  { path: "/", name: "Components", component: Components }
];

export default indexRoutes;
