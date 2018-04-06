import {apiCall } from "../../services/api";
import {addError} from "./errors";
import {LOAD_USER_PROFILE, LOAD_USER_FOLLOW, UPDATE_USER_PROFILE} from "../actionTypes";

export const loadProfile = user => ({
  type: LOAD_USER_PROFILE,
  user
});
export const loadFollow = users => ({
  type: LOAD_USER_FOLLOW,
  users
})
export const updateProfile = update => ({
  type: UPDATE_USER_PROFILE,
  update
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

export const followUser = (userId) => {
  return dispatch => {
    return apiCall("post", `/api/${userId}/follow`)
    .then((res) => {
      dispatch(updateProfile(res));
     })
    .catch(err =>{
      dispatch(addError(err.errors.message));
    });
  };
};
