import {apiCall } from "../../services/api";
import {addError} from "./errors";
import {LOAD_USER_PROFILE} from "../actionTypes";

export const loadProfile = user => ({
  type: LOAD_USER_PROFILE,
  user
});

export const getUserProfile = (id) => {
  return dispatch => {
    return apiCall("get", `/api/user/${id}`)
    .then((res) => { 
      dispatch(loadProfile(res));
    })
    .catch((err) => {
      dispatch(addError(err.message));
    });
  };
};