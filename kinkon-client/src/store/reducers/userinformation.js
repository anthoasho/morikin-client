import {LOAD_USER_PROFILE, UPDATE_USER_PROFILE} from "../actionTypes";

//NOTE this is NOT for current active user this is for any profile being viewed (which can include current user)

const userProfile = (state = {user: {}}, action) => {
  switch(action.type){
    case LOAD_USER_PROFILE:
      return {...state, user: action.user};// Load the profile with data from api call
    case UPDATE_USER_PROFILE:
      return {...state, user: {...state.user, ...action.update}} //alter elements of the user profile
    default:
      return state;
  }
};

export default userProfile;
