import { LOAD_MESSAGES, REMOVE_MESSAGE, LIKE_MESSAGE, ANIMATE_REMOVE_MESSAGE, FETCHING_MESSAGES, UPDATE_MESSAGES, LAST_MESSAGE, POST_MESSAGE, LOAD_MSG_LIKES, UPDATE_LIKE_LIST }  from "../actionTypes";
import {changeStateArrayItem, stateWithLikeMessage, animatedRemoveMessage} from "./helperFunctions";

const initialState = {
  loading: false,
  data: [],
  isLast: false,
  likes: null
}
const messages = (state = initialState, action) => {
  switch(action.type){
    case FETCHING_MESSAGES:
      return {
        ...state,
        loading: true
      };
    case UPDATE_MESSAGES:
      return {
        ...state,
        loading: false,
        data: state.data.concat([...action.messages])
      }
    case POST_MESSAGE:
      return {
        ...state,
        data: [{...action.message,
                    likedBy: 0}
        , ...state.data]
      }
    case LOAD_MESSAGES:
      return {
        ...state,
        loading: false,
        isLast: false,
        data: [...action.messages]
      }// FIX the continuous scroll by allowing it to concat with prevState -- perhaps it's worth making that a separate state?
    case ANIMATE_REMOVE_MESSAGE:
      let animatedState = animatedRemoveMessage(action, state.data)
        return {
          ...state,
          loading: false,
          data: [...animatedState]};
    case REMOVE_MESSAGE:
        return {
          ...state,
          loading: false,
          data: state.data.filter(message => message._id !== action.id)};
    case LIKE_MESSAGE:
        let newState = stateWithLikeMessage(action.message, state.data)
        return {
          ...state,
          loading: false,
          data: [...newState]};
    case LAST_MESSAGE:
        return {
          ...state,
          isLast: true
        }
    case LOAD_MSG_LIKES:
      return {
        ...state,
        likes: action.users
      }
    case  UPDATE_LIKE_LIST:
      let newLikes = changeStateArrayItem(action.id, action.update, state.likes);
      return {
        ...state,
        likes: [...newLikes]
      }
    default:
      return state;
  }
};
export default messages;
