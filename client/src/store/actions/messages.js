import {apiCall } from "../../services/api";
import {addError} from "./errors";
import {LOAD_MESSAGES, REMOVE_MESSAGE, LIKE_MESSAGE, ANIMATE_REMOVE_MESSAGE, FETCHING_MESSAGES, UPDATE_MESSAGES } from "../actionTypes";


export const fetchingData = () =>({
  type:FETCHING_MESSAGES,
})
export const loadMessages = messages => ({
  type: LOAD_MESSAGES,
  messages
});

export const updateMessageList = messages => ({
  type: UPDATE_MESSAGES,
  messages
})
export const remove = id => ({
  type: REMOVE_MESSAGE,
  id
});

export const animateRemove = id => ({
  type: ANIMATE_REMOVE_MESSAGE,
  id
})
export const likeMsg = message => ({
  type: LIKE_MESSAGE,
  message
})

//soft deletes the message, sets isDeleted: true
//if a message isDeleted, it does not return from the api call
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



//Gets messages from API,
//If there is a user profile being viewed it will bring the users messages
//otherwise it will return all messages
export const fetchMessages = (user, page) => {
  return dispatch => {
    dispatch(fetchingData());
    if(user){
      return apiCall("get", `/api/user/${user}/messages/?page=${page}`)
              .then((res) => {
                dispatch(loadMessages(res));
              })
              .catch((error) => {
                dispatch(addError(error));
              });
    }else if(!user){
    return apiCall("get", `/api/messages/?page=${page}`)
            .then((res) => {
              dispatch(loadMessages(res));
            })
            .catch((error) => {
              dispatch(addError(error));
    });
  };
}

};


export const updateMessages = (user, page) =>{
  return dispatch => {
    if(user){
      return apiCall("get", `/api/user/${user}/messages/?page=${page+1}`)
              .then((res) => {
                dispatch(updateMessageList(res));
              })
              .catch((error) => {
                dispatch(addError(error));
              });
    }else if(!user){
    return apiCall("get", `/api/messages/?page=${page+1}`)
            .then((res) => {
              dispatch(updateMessageList(res));
            })
            .catch((error) => {
              dispatch(addError(error));
    });
  };
}
}
//posts with the current user
//Backend checks login authentication and authorisation
export const postNewMessage = text => (dispatch, getState) => {
  let {currentUser} = getState();
  const id = currentUser.user.userId;
  return apiCall("post", `/api/users/${id}/messages`, {text})
  .then(res => {})
  .catch(err => {
    dispatch(addError(err.errors.message));
  });
};
