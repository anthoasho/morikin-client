import {apiCall } from "../../services/api";
import {addError} from "./errors";
import {LOAD_MESSAGES, REMOVE_MESSAGE } from "../actionTypes";

export const loadMessages = messages => ({
  type: LOAD_MESSAGES,
  messages
});

export const remove = id => ({
  type: REMOVE_MESSAGE,
  id
});

export const removeMessage = (user, message) => {
  return dispatch => {
    return apiCall("put", `/api/users/${user}/messages/${message}/delete`, {isDeleted: true})
    .then(() => dispatch(remove(message)))
    .catch((err) => {
      dispatch(addError(err.message));
    });
  };
};

export const fetchMessages = (url) => {
  return dispatch => {
    return apiCall("get", `/api/${url}/messages`)
    .then((res) => { 
      dispatch(loadMessages(res));
    })
    .catch((error) => {
      dispatch(addError(error));
    });
  };
};

export const postNewMessage = text => (dispatch, getState) => {
  let {currentUser} = getState();
  const id = currentUser.user.userId;
  return apiCall("post", `/api/users/${id}/messages`, {text})
  .then(res => {})
  .catch(err => {
    dispatch(addError(err.errors.message));
  });
};