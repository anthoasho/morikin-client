import {apiCall } from "../../services/api";
import {addError} from "./errors";
import {LOAD_USER_PROFILE} from "../actionTypes";

export const loadProfile = user => ({
  type: LOAD_USER_PROFILE,
  user
});

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

export const followUser = (userId) => {
  return dispatch => {
    return apiCall("post", `/api/${userId}/follow`)
    .then((res) => { })
    .catch(err =>{
      dispatch(addError(err.errors.message));
    });
  };
};