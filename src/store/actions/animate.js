import { ANIMATE_PROFILE  }  from "../actionTypes";
//Alter the animations of each container using this
//Takes no arguments as each action changes the state entirely with a truthy
//This is prototypical so will likely be altered in the future to make a single action type

export const animateProfile = () => ({
  type: ANIMATE_PROFILE
})
