import {LOAD_USER_PROFILE, UPDATE_USER_PROFILE} from "../actionTypes";

const userProfile = (state = {user: {}}, action) => {
  switch(action.type){
    case LOAD_USER_PROFILE:
      return {...state, user: action.user};// HOPEFULLY THIS WORKS OM
    case UPDATE_USER_PROFILE:
      return {...state, user: {...state.user, ...action.update}} //fix this.
    default:
      return state;
  }
};

export default userProfile;
