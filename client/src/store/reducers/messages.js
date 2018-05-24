import { LOAD_MESSAGES, REMOVE_MESSAGE, LIKE_MESSAGE, ANIMATE_REMOVE_MESSAGE, FETCHING_MESSAGES, UPDATE_MESSAGES, LAST_MESSAGE, POST_MESSAGE, LOAD_MSG_LIKES, UPDATE_LIKE_LIST }  from "../actionTypes";
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
        data: [action.message, ...state.data]
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
      let newLikes = changeState(action.id, action.update, state.likes);
      return {
        ...state,
        likes: [...newLikes]
      }
    default:
      return state;
  }
};

//this is very similar to other State altering functions
//TODO combine these extra functions into a separate callable file

function animatedRemoveMessage(data, state){
  var value = state.findIndex(m => m._id === data.id);
  let test = state;
    for (var i in test){
      let valueToString = value.toString();
      if(i === valueToString){
        test[i].isDeleted = true;
        break;
      }
    }
    return test
}
//alter the state to affect the like button aswell as like counter
function stateWithLikeMessage(data, state){
  var value = state.findIndex(m => m._id === data._id);
  let test = state;
    for (var i in test){
      let valueToString = value.toString();
      if(i === valueToString){
        test[i].isLiked = data.isLiked;
        test[i].likedBy = data.likedBy;
        break;
      }
    }
    return test
}
function changeState(id, data, state){
  let test = state;
    for (var i in test){
      let idToString = id.toString();
      if(i === idToString){
        test[i].following = data;
        break;
      }
    }
    return test
}


export default messages;
