import {apiCall, setAuthToken } from "../../services/api";
import {addError, removeError} from "./errors";
import {LOAD_USER_PROFILE, LOAD_USER_FOLLOW, UPDATE_USER_PROFILE, UPDATE_FOLLOW_LIST, UPDATE_CURRENT_USER, FETCHING_PROFILE, GET_DISCOVER_USERS} from "../actionTypes";

export const loadProfile = user => ({
  type: LOAD_USER_PROFILE,
  user
});
export const fetchingProfile = () => ({
  type: FETCHING_PROFILE
})
export const updateCurrentUser = user => ({
  type: UPDATE_CURRENT_USER,
  user
})
export const updateProfile = update => ({
  type: UPDATE_USER_PROFILE,
  update
})
export const loadFollow = users => ({
  type: LOAD_USER_FOLLOW,
  users
})
export const updateFollowList = (update, id) => ({
  type: UPDATE_FOLLOW_LIST,
  update,
  id
})
export const discoverUsers = users => ({
  type: GET_DISCOVER_USERS,
  users
})



export function setAuthorizationToken(token){
  setAuthToken(token);
}


export const getDiscoverUsers = () => {
  return dispatch => {
    return apiCall("get", "/api/discover/users")
    .then(res => {
      dispatch(discoverUsers(res));
    })
  }
}
//This is used to get the profile of the user (not including messages, that is a seperate API call)
export const getUserProfile = (username) => {
  return dispatch => {
    dispatch(fetchingProfile())
    return apiCall("get", `/api/user/${username}`) //This previously used the ID of the user, I may revert if necessary.
    .then((res) => {
      dispatch(loadProfile(res));
      dispatch(removeError());
    })
    .catch((err) => {
      dispatch(addError(err));
    });
  };
};

//Collects the list of followers/following
//url is passed as an argument to clarify following || followers
export const getFollowList = (url) => {
  return dispatch => {
    return apiCall("get", `/api/${url}`)
      .then((res) => {
        dispatch(loadFollow(res));
        dispatch(removeError());

      })
      .catch((err) => {
        dispatch(addError(err));
      })
  }
}

//Edits part of the profile (not the password currently - TODO)
//Upon edit, it will update the token within the local storage
export const editProfile = userData => (dispatch) => {
  return apiCall("post", `/api/user/updateprofile`, {userData})
  .then(res => {
    localStorage.setItem("jwtToken", res.token)
    dispatch(updateCurrentUser(res.response));
    dispatch(removeError());
  })
  .catch(err => {
    dispatch(addError(err));
  });
};

//This took a long time, this is intended to handle an update in both the user profile and follow followList
//Honestly, I can't remember why I made the arguments an array to be honest.
//TODO - figure out the above problem
export const followUser = ([userId, location, itemNum]) => {
  return dispatch => {
    return apiCall("post", `/api/${userId}/follow`)
    .then((res) => {
      if(location==="followList"){
        dispatch(updateFollowList(res.following, itemNum));
        dispatch(removeError());
      }else{
      dispatch(updateProfile(res));
      dispatch(removeError());

    }
     })
    .catch(err =>{
      dispatch(addError(err.errors.message));
    });
  };
};
