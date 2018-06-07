import {apiCall } from "../../services/api";
import {addError, removeError} from "./errors";
import {isLoading, isLoaded} from "./UI";
import {LOAD_MESSAGES, REMOVE_MESSAGE, LIKE_MESSAGE, ANIMATE_REMOVE_MESSAGE, FETCHING_MESSAGES, UPDATE_MESSAGES, LAST_MESSAGE, POST_MESSAGE, LOAD_MSG_LIKES, UPDATE_LIKE_LIST } from "../actionTypes";


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
export const loadLikes = users => ({
  type: LOAD_MSG_LIKES,
  users
})
export const updateLikeList = (update, id) => ({
  type: UPDATE_LIKE_LIST,
  update,
  id
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
export const postMessage = message => ({
  type: POST_MESSAGE,
  message
})
export const lastMessage = () =>({
  type: LAST_MESSAGE
})


export const lastMessageCheck = (message, dispatch) =>{
  if(message && message.isLast){
  return  dispatch(lastMessage());
  };
}

// Use context to combine this with Follow list
export const getLikeList = (url) => {
  return dispatch => {
    return apiCall("get", `/api/${url}`)
      .then((res) => {
        dispatch(loadLikes(res));
        dispatch(removeError());
      })
      .catch((err) => {
        dispatch(addError(err));
      })
  }
}

export const followUser = ([userId, location, itemNum]) => {
  return dispatch => {
    return apiCall("post", `/api/${userId}/follow`)
    .then((res) => {
      if(location==="followList"){
        dispatch(updateLikeList(res.following, itemNum));
        dispatch(removeError());
      }else{
      dispatch(removeError());
    }
     })
    .catch(err =>{
      dispatch(addError(err.errors.message));
    });
  };
};

//soft deletes the message, sets isDeleted: true
//if a message isDeleted, it does not return from the api call
export const removeMessage = (user, message) => {
  return dispatch => {
    return apiCall("put", `/api/users/${user}/messages/${message}/delete`, {isDeleted: true})
    .then(() =>
    dispatch(animateRemove(message))
  )
    .then(() => setTimeout(() => {
      dispatch(remove(message));
      dispatch(removeError());
    }, 500))
    .catch((err) => {
      dispatch(addError(err));
    });
  };
};

export const likeMessage = (id) => {
  return dispatch => {
    return apiCall("post", `/api/messages/${id}/like`)
      .then((res) => {
        dispatch(likeMsg(res));
        dispatch(removeError());
      })
      .catch((error) => {
        dispatch(addError(error));
      })
  }
}

export const updateMessages = (user, lastMessage) =>{
  return dispatch => {
    if(user){
      return apiCall("get", `/api/user/${user}/messages/?from=${lastMessage}`)
              .then((res) => {
                dispatch(updateMessageList(res));
              lastMessageCheck(res[res.length -1], dispatch)
                dispatch(removeError());
              })
              .catch((error) => {
                dispatch(addError(error));
              });
    }else if(!user){
    return apiCall("get", `/api/messages/?from=${lastMessage}`)
            .then((res) => {
              dispatch(updateMessageList(res));
              lastMessageCheck(res[res.length -1], dispatch)
              dispatch(removeError());
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
  dispatch(isLoading())
  return apiCall("post", `/api/users/${id}/messages`, {text})
  .then(res => {
    dispatch(postMessage(res));
    dispatch(isLoaded())
  })
  .catch(err => {
    dispatch(addError(err));
  });
};



/*

OLD CODE FOR REFERENCE
Has been replaced with a single function for both user profile and messages
*/


//Gets messages from API,
// export const fetchMessages = (user) => {
//   return (dispatch, getState) => {
//     // dispatch(fetchingData());
//     let {currentUser} = getState()
//     let username = currentUser.user.username
//  if(!user){
//           dispatch(isLoading());
//     Promise.all([apiCall("get", `/api/messages/`), apiCall("get", `/api/user/${username}`)])
//             .then((res) => {
//               dispatch(loadProfile(res[1]));
//               dispatch(loadMessages(res[0]));
//               lastMessageCheck(res[0][res[0].length -1], dispatch)
//               dispatch(isLoaded());
//               dispatch(removeError());
//             })
//             .catch((error) => {
//               dispatch(addError(error)); //Alter this later
//     });
//   };
// }
//
// };
