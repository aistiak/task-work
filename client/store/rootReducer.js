import { combineReducers } from "redux"
import { authReducer } from "./auth/auth.reducer";
import { blogReducer } from "./blog/blog.reducer";
import { userReducer } from "./user/user.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  user : userReducer ,
  blog : blogReducer 
  
})

export default rootReducer;