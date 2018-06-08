import {LOAD_USER_PROFILE, UPDATE_USER_PROFILE, FETCHING_PROFILE} from "../actionTypes";

//NOTE this is NOT for current active user this is for any profile being viewed (which can include current user)
const initialState = {
  loading: false,
  user: {}
}
const userProfile = (context, state = initialState, action) => {

  if(context !== action.context) return state
  switch(action.type){
    case FETCHING_PROFILE:
      return {...state, loading: true, user: {...state.user}}
    case LOAD_USER_PROFILE:
      return {...state, loading: false, user: {...action.user}};// Load the profile with data from api call
    case UPDATE_USER_PROFILE:
      return {...state, loading: false, user: {...state.user, ...action.update}} //alter elements of the user profile
    default:
      return state;

}
};

export default userProfile;
