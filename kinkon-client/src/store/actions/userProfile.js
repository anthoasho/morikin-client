import {apiCall } from "../../services/api";
import {addError} from "./errors";
import {LOAD_USER_PROFILE, LOAD_USER_FOLLOW, UPDATE_USER_PROFILE, UPDATE_FOLLOW_LIST} from "../actionTypes";

export const loadProfile = user => ({
  type: LOAD_USER_PROFILE,
  user
});

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
export const getUserProfile = (username) => {
  return dispatch => {
    return apiCall("get", `/api/user/${username}`) //This previously used the ID of the user, I may revert if necessary.
    .then((res) => {
      dispatch(loadProfile(res));
    })
    .catch((err) => {
      dispatch(addError(err.message));
    });
  };
};

export const getFollowList = (url) => {
  return dispatch => {
    return apiCall("get", `/api/${url}`)
      .then((res) => {
        dispatch(loadFollow(res));
      })
      .catch((err) => {
        dispatch(addError(err.message));
      })
  }
}

export const followUser = ([userId, location, itemNum]) => {

  return dispatch => {
    return apiCall("post", `/api/${userId}/follow`)
    .then((res) => {
      if(location==="followList"){
        dispatch(updateFollowList(res.following, itemNum));
      }else{
      dispatch(updateProfile(res));
    }
     })
    .catch(err =>{
      dispatch(addError(err.errors.message));
    });
  };
};
