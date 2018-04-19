import { LOAD_MESSAGES, REMOVE_MESSAGE, LIKE_MESSAGE, ANIMATE_REMOVE_MESSAGE }  from "../actionTypes";

const messages = (state = [], action) => {
  switch(action.type){
    case LOAD_MESSAGES:
      return [...action.messages];// FIX the continuous scroll by allowing it to concat with prevState -- perhaps it's worth making that a separate state?
    case ANIMATE_REMOVE_MESSAGE:
      let animatedState = animatedRemoveMessage(action, state)
        return [...animatedState];
    case REMOVE_MESSAGE:
        return state.filter(message => message._id !== action.id);
    case LIKE_MESSAGE:
        let newState = stateWithLikeMessage(action.message, state)
        return [...newState];
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


export default messages;
