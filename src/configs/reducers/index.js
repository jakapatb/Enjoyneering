import { combineReducers } from "redux";
// reducers
import post from "./post.js";
import notifications from "./notifications.js";
import listPost from "./listPost.js";
import auth from "./auth.js";
export default combineReducers({
  post,
  notifications,
  listPost,
  auth
});
