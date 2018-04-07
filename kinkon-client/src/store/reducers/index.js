import {combineReducers} from "redux";
import currentUser  from "./currentUser";
import errors from "./errors";
import messages from "./messages";
import userProfile from "./userinformation";
import  follow from "./following";

const rootReducer = combineReducers({
  currentUser,
  errors,
  messages,
  userProfile,
  follow
});

export default rootReducer;
