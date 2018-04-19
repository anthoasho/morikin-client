import { LOAD_MESSAGES, REMOVE_MESSAGE, LIKE_MESSAGE, ANIMATE_REMOVE }  from "../actionTypes";

const messages = (state = [], action) => {
  switch(action.type){
    case LOAD_MESSAGES:
      return [...action.messages];// FIX the continuous scroll by allowing it to concat with prevState -- perhaps it's worth making that a separate state?
    case ANIMATE_REMOVE:
      let newStateTest = changeStateTwo(action, state)
        return [...newStateTest];
    case REMOVE_MESSAGE:
        return state.filter(message => message._id !== action.id);
    case LIKE_MESSAGE:
        let newState = changeState(action.message, state)
        return [...newState];
    default:
      return state;
  }
};

function changeStateTwo(desc, theState){
  console.log(desc)
  console.log(theState)
  var value = theState.findIndex(m => m._id === desc.id);
  let test = theState;
    for (var i in test){
      let valueToString = value.toString();
      if(i === valueToString){
        test[i].isDeleted = true;
        break;
      }
    }
    return test
}

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


export default messages;
