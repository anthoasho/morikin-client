import { ANIMATE_ENTER, ANIMATE_ENTER_REVERSE, ANIMATE_EXIT, ANIMATE_EXIT_REVERSE, ANIMATE_REMOVE, ANIMATE_PROFILE  }  from "../actionTypes";
//Alter the animations of each container using this
//Takes no arguments as each action changes the state entirely with a truthy
//This is prototypical so will likely be altered in the future to make a single action type
export const animateEnter = () => ({
  type: ANIMATE_ENTER
})
export const animateEnterReverse = () => ({
  type: ANIMATE_ENTER_REVERSE
})
export const animateExit = () => ({
  type: ANIMATE_EXIT
})
export const animateExitReverse = () => ({
  type: ANIMATE_EXIT_REVERSE
})
export const removeAnimation = () => ({
  type: ANIMATE_REMOVE
})
export const animateProfile = () => ({
  type: ANIMATE_PROFILE
})
