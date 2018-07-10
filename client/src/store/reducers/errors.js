import {ADD_ERROR, REMOVE_ERROR} from "../actionTypes";


export default (state = { message:null}, action) => {
  switch (action.type){
    case ADD_ERROR:
      return {...state, message: action.error.data ? action.error.data.clientMessage : action.error.statusText, code: action.error.status};
    case REMOVE_ERROR:
      return {...state, message: null, code: null};
    default:
      return state;
  }
}
