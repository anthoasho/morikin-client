import {apiCall } from "../../services/api";
import {addError} from "./errors";
import {LOAD_MESSAGES, REMOVE_MESSAGE, LIKE_MESSAGE, ANIMATE_REMOVE } from "../actionTypes";

export const loadMessages = messages => ({
  type: LOAD_MESSAGES,
  messages
});

export const remove = id => ({
  type: REMOVE_MESSAGE,
  id
});

export const animateRemove = id => ({
  type: ANIMATE_REMOVE,
  id
})
export const likeMsg = message => ({
  type: LIKE_MESSAGE,
  message
})

export const removeMessage = (user, message) => {
  return dispatch => {
    return apiCall("put", `/api/users/${user}/messages/${message}/delete`, {isDeleted: true})
    .then(() =>
    dispatch(animateRemove(message))
  )
    .then(() => setTimeout(() => {dispatch(remove(message))}, 500))
    .catch((err) => {
      dispatch(addError(err.message));
    });
  };
};

export const likeMessage = (id) => {
  return dispatch => {
    return apiCall("post", `/api/messages/${id}/like`)
      .then((res) => {
        dispatch(likeMsg(res));
      })
      .catch((error) => {
        console.log(error)
        dispatch(addError(error));
      })
  }
}

export const fetchMessages = (user) => {
  return dispatch => {
    if(user){
      return apiCall("get", `/api/user/${user}/messages`)
              .then((res) => {
                dispatch(loadMessages(res));
              })
              .catch((error) => {
                dispatch(addError(error));
              });
    }else if(!user){
    return apiCall("get", `/api/messages`)
            .then((res) => {
              dispatch(loadMessages(res));
            })
            .catch((error) => {
              dispatch(addError(error));
    });
  }; // Why is this unreachable?
}

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
