import {SET_CURRENT_USER} from "../actionTypes";

const DEFAULT_STATE = {
  isLoggedIn: false,
  user: {}
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type){
    case SET_CURRENT_USER:
      return {
        isLoggedIn: !!Object.keys(action.user).length,
        user: action.user
      };
    default: 
      return state;
  }
}