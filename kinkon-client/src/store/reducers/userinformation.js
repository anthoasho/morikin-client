import {LOAD_USER_PROFILE} from "../actionTypes";

const userProfile = (state = {user: {}}, action) => {
  switch(action.type){
    case LOAD_USER_PROFILE:
      return {user: action.user};// HOPEFULLY THIS WORKS OMG
    default: 
      return state;
  }
};

export default userProfile;