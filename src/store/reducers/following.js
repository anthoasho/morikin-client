import {LOAD_USER_FOLLOW, UPDATE_FOLLOW_LIST, CLEAR_FOLLOW} from "../actionTypes";
import {changeStateArrayItem} from "./helperFunctions";
const follow = (state = [], action) => {
  switch(action.type){
    case LOAD_USER_FOLLOW:
      return action.users
      case UPDATE_FOLLOW_LIST:
        let newState = changeStateArrayItem(action.id, action.update, state);
        return [...newState]
      case CLEAR_FOLLOW:
        return []
      default:
        return state;
  }
};

export default follow;
