import Components from "views/Components/Components.jsx";
import LandingPage from "views/LandingPage/LandingPage.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";
import ProfilePage from "views/ProfilePage/ProfilePage.jsx";
import CreatePost from "views/CreatePost/CreatePost";
import SearchPage from "views/SearchPage/SearchPage";
import Management from "views/Management/Management.jsx";  
var indexRoutes = [
  { path: "/landing-page", name: "LandingPage", component: LandingPage ,private:false },

  { path: "/login-page", name: "LoginPage", component: LoginPage, private: false},
  { path: "/profile-page", name: "ProfilePage", component: ProfilePage, private: false},
  { path: "/create-post", name: "CreatePost", component: CreatePost, private: true},
  { path: "/search", name: "SearchPage", component: SearchPage, private: false},
  { path: "/management", name: "Management", component: Management, private: true}, 
  { path: "/", name: "Components", component: Components, private: false}
];

export default indexRoutes;
