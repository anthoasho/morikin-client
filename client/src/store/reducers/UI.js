import {SHOW_FOLLOW, CLOSE_FOLLOW, SHOW_LIKES, CLOSE_LIKES, SHOW_NEW_MESSAGE, CLEAR_ALL, ANIMATE_CLOSE, IS_LOADING, IS_LOADED, WINDOW_RESIZE} from "../actionTypes";

const DEFAULT_STATE = {
  popUp: {
      display: false,
      method: null,
      title: null,
      url: null
  },
  follow:{
    display: false,
    animateOut: false
  },
  newMessage:{
    display:false
  },
  likes:{
    display: false,
    title: null,
    url: null
  },
  loading: false,
  isMobile: window.innerWidth <= 500
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
    case ANIMATE_CLOSE:
      return {
        ...state,
        [action.select]:
          {
            ...state[action.select],
            animateOut: true
          }
      }
    case SHOW_NEW_MESSAGE:
      return{
        ...state,
      newMessage: {
        display: !state.newMessage.display
      }
    }
    case IS_LOADING:
      return{
        ...state,
        loading: true
      }
    case IS_LOADED:
      return{
        ...state,
        loading: false
      };
    case WINDOW_RESIZE:
      return{
        ...state,
        isMobile: action.size
      }
    case CLEAR_ALL:
      return {...DEFAULT_STATE,
              loading: state.loading,
              isMobile: state.isMobile
            }
    default:
        return state;
  }
}
