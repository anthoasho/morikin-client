import {combineReducers} from "redux";
import auth  from "./currentUser";
import errors from "./errors";
import messages from "./messages";
import profile from "./userinformation";
import animate from "./transitions";
import  follow from "./following";
import discover from "./discover";
import ui from "./UI";

// const rootReducer = combineReducers({
//   currentUser,
//   errors,
//   messages,
//   userProfile,
//   follow,
//   animate,
//   discover,
//   ui
// });

const rootReducer = combineReducers({
  myProfile: combineReducers({
    auth,
    profile: profile.bind(null, "myProfile"),
    messages: messages.bind(null, "myProfile")
  }),
  errors,
  dashboard: combineReducers({
    profile: profile.bind(null, "dashboard"),
    messages: messages.bind(null, "dashboard")
  }),
  profile: combineReducers({
    profile: profile.bind(null, "profile"),
    messages: messages.bind(null, "profile")
  }),
  follow,
  animate,
  discover,
  ui
});
export default rootReducer;
