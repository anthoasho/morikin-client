import { LOAD_MESSAGES, REMOVE_MESSAGE, LIKE_MESSAGE }  from "../actionTypes";

const messages = (state = [], action) => {
  switch(action.type){
    case LOAD_MESSAGES:
      return [...action.messages];// FIX the continuous scroll by allowing it to concat with prevState -- perhaps it's worth making that a separate state?
    case REMOVE_MESSAGE:
        return state.filter(message => message._id !== action.id);
    case LIKE_MESSAGE:
        let newState = changeState(action.message, state)
        return [...newState];
    default:
      return state;
  }
};
function changeState(desc, theState){
  var value = theState.findIndex(m => m._id === desc._id);
  let test = theState;
    for (var i in test){
      let valueToString = value.toString();
      if(i === valueToString){
        test[i].isLiked = desc.isLiked;
        test[i].likedBy = desc.likedBy;
        break;
      }
    }
    return test
}
function arrayAlter(state, action){
  var index = state.findIndex(m => m._id === action.message._id);
  state[index] = action.message

  return state

}


export default messages;
