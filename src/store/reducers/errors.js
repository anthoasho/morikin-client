import {ADD_ERROR, REMOVE_ERROR, POPUP_SHOW, POPUP_HIDE, ADD_POPUP_BUTTON} from "../actionTypes";

const initialState = {
  popup: false,
  message: null,
  code: null
}

export default (state = initialState, action) => {
  switch (action.type){

    case POPUP_SHOW:
      return {...state,
              popup: true
              }
    case POPUP_HIDE:
      return initialState
    case ADD_ERROR:
      return {...state,
              message: action.data.message,
              code: action.data.code,
              method: action.method
            };
    case ADD_POPUP_BUTTON:
      return {...state,
              func: action.func,
              args: action.args,
              text: action.text
      }
    case REMOVE_ERROR:
      return  initialState;
    default:
      return state;
  }
}
