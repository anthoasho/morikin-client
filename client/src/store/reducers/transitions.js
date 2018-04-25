import { ANIMATE_ENTER, ANIMATE_ENTER_REVERSE, ANIMATE_EXIT, ANIMATE_EXIT_REVERSE, ANIMATE_REMOVE  }  from "../actionTypes";

const animate = (state = {}, action) =>{
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
  default:
    return state;
  }
}

export default animate;
