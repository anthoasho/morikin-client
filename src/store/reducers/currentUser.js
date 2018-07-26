import {SET_CURRENT_USER, UPDATE_CURRENT_USER} from "../actionTypes";

const DEFAULT_STATE = {
  isLoggedIn: false,
};

export default (state = DEFAULT_STATE, action) => {

  switch (action.type){
    case SET_CURRENT_USER:
      return {
        ...state,
        isLoggedIn: !!Object.keys(action.user).length,
        ...action.user
      };
    case UPDATE_CURRENT_USER:
      return {
        ...state,
        ...action.user
      }
    default:
      return state;
  }
}
