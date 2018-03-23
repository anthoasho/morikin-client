import {combineReducers} from "redux";
import currentUser  from "./currentUser";
import errors from "./errors";
import messages from "./messages";
import userProfile from "./userinformation";

const rootReducer = combineReducers({
  currentUser,
  errors,
  messages,
  userProfile
});

export default rootReducer;