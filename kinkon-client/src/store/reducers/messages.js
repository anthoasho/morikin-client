import { LOAD_MESSAGES, REMOVE_MESSAGE }  from "../actionTypes";

const messages = (state = [], action) => {
  switch(action.type){
    case LOAD_MESSAGES:
      return [...action.messages];// FIX the continuous scroll by allowing it to concat with prevState -- perhaps it's worth making that a separate state? 
    case REMOVE_MESSAGE: 
        return state.filter(message => message._id !== action.id);
    default: 
      return state;
  }
};

export default messages;