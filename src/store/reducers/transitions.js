import { ANIMATE_ENTER, ANIMATE_ENTER_REVERSE, ANIMATE_EXIT, ANIMATE_EXIT_REVERSE, ANIMATE_REMOVE, ANIMATE_PROFILE  }  from "../actionTypes";

const animate = (state = {profileHide: false}, action) =>{
  switch(action.type){
  case ANIMATE_ENTER:
    return {enter: true}
  case ANIMATE_ENTER_REVERSE:
    return {enterReverse: true}
  case ANIMATE_EXIT:
    return {exit: true}
  case ANIMATE_EXIT_REVERSE:
    return {exitReverse: true}
  case ANIMATE_REMOVE:
    return {}
  case ANIMATE_PROFILE:
    return {profileHide: !state.profileHide}
  default:
    return state;
  }
}

export default animate;
