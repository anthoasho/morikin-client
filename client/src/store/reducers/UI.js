import {SHOW_FOLLOW, CLOSE_FOLLOW, SHOW_LIKES, CLOSE_LIKES, SHOW_NEW_MESSAGE, CLEAR_ALL} from "../actionTypes";

const DEFAULT_STATE = {
  popUp: {
      display: false,
      method: null,
      title: null,
      url: null
  },
  follow:{
    display: false
  },
  newMessage:{
    display:false
  },
  likes:{
    display: false,
    title: null,
    url: null
  }
}

export default(state = DEFAULT_STATE, action) =>{
  switch(action.type){
    case SHOW_FOLLOW:
      return{
        ...state,
        follow: {
          display: true,
          title: action.title,
          url: action.url
        }
      }
    case CLOSE_FOLLOW:
        return {...state,
          follow: {
            display: false,
            title: null,
            url: null
          }
        }
      case SHOW_LIKES:
        return{
          ...state,
          likes: {
            display: true,
            title: action.title,
            url: action.url
          }
        }
      case CLOSE_LIKES:
      return{
        ...state,
        likes: {
          display: false,
          title: null,
          url: null
        }
      }

    case SHOW_NEW_MESSAGE:
      return{
        ...state,
      newMessage: {
        display: !state.newMessage.display
      }
    }
    case CLEAR_ALL:
      return DEFAULT_STATE
    default:
        return state;
  }
}
