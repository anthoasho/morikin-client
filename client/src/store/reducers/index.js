import {combineReducers} from "redux";
import currentUser  from "./currentUser";
import errors from "./errors";
import messages from "./messages";
import userProfile from "./userinformation";
import animate from "./transitions";
import  follow from "./following";
import discover from "./discover";
import ui from "./UI";

const rootReducer = combineReducers({
  currentUser,
  errors,
  messages,
  userProfile,
  follow,
  animate,
  discover,
  ui
});

export default rootReducer;
