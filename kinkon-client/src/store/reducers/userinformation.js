import {LOAD_USER_PROFILE, LOAD_USER_FOLLOW, UPDATE_USER_PROFILE} from "../actionTypes";

const userProfile = (state = {user: {}, follow: {}}, action) => {
  switch(action.type){
    case LOAD_USER_PROFILE:
      return {...state, user: action.user};// HOPEFULLY THIS WORKS OMG
    case LOAD_USER_FOLLOW:
      return {...state, follow: action.users} //Make into own action? --- Definitely make own action
    case UPDATE_USER_PROFILE:
      return {...state, user: {...state.user, ...action.update}} //fix this.
    default:
      return state;
  }
};

export default userProfile;
