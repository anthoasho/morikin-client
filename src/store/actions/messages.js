import {apiCall } from "../../services/api";
import {addError, removeError, popupShow, popupButton} from "./errors";
import {showNewMessage} from "./UI";
import {LOAD_MESSAGES, REMOVE_MESSAGE, LIKE_MESSAGE, ANIMATE_REMOVE_MESSAGE, FETCHING_MESSAGES, UPDATE_MESSAGES, LAST_MESSAGE, POST_MESSAGE, LOAD_MSG_LIKES, UPDATE_LIKE_LIST } from "../actionTypes";


export const fetchingData = () =>({
  type:FETCHING_MESSAGES,
})
export const loadMessages = (messages, context) => ({
  type: LOAD_MESSAGES,
  messages,
  context
})

export const updateMessageList = (messages, context) => ({
  type: UPDATE_MESSAGES,
  messages,
  context
})
export const loadLikes = (users, context) => ({
  type: LOAD_MSG_LIKES,
  users,
  context
})
export const updateLikeList = (update, id, context) => ({
  type: UPDATE_LIKE_LIST,
  update,
  id,
  context
})
export const remove = (id, context) => ({
  type: REMOVE_MESSAGE,
  id,
  context
});

export const animateRemove = (id, context) => ({
  type: ANIMATE_REMOVE_MESSAGE,
  id,
  context
})
export const likeMsg = (message, context)=> ({
  type: LIKE_MESSAGE,
  message,
  context
})
export const postMessage = (message, context) => ({
  type: POST_MESSAGE,
  message,
  context
})
export const lastMessage = (context) =>({
  type: LAST_MESSAGE,
  context
})


export const lastMessageCheck = (message, dispatch, context) =>{
  if(message && message.isLast){
  return  dispatch(lastMessage(context));
  };
}
export const retry = (func, args)=>{
  return func.apply(null, args)
}
// Use context to combine this with Follow list
export const getLikeList = (url) => {
  return (dispatch, getState) => {
    let {ui} = getState()
    let {context} = ui
    return apiCall("get", `api/${url}`)
      .then((res) => {
        dispatch(loadLikes(res, context));
        dispatch(removeError());
      })
      .catch((err) => {
        dispatch(addError(err, getLikeList, [url]));
      })
  }
}

export const followUser = ([userId, location, itemNum]) => {
  return (dispatch, getState) => {
    // let {ui} = getState()
    // let {context} = ui
    return apiCall("post", `api/${userId}/follow`)
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
  return (dispatch, getState) => {
    let {ui} = getState()
    let {context} = ui
    return apiCall("put", `api/users/${user}/messages/${message}/delete`, {isDeleted: true})
    .then(() =>
    dispatch(animateRemove(message, context))
  )
    .then(() => setTimeout(() => {
      dispatch(remove(message, context));
      dispatch(removeError());
    }, 5000))
    .catch((err) => {
      dispatch(addError(err, "error"));
      dispatch(popupButton("Retry?", removeMessage, [user, message]));
      dispatch(popupShow());
    });
  };
};

export const likeMessage = (id) => {
  return (dispatch, getState) => {
    let {ui} = getState()
    let {context} = ui
    return apiCall("post", `api/messages/${id}/like`)
      .then((res) => {
        dispatch(likeMsg(res, context));
        dispatch(removeError());
      })
      .catch((err) => {
        dispatch(addError(err, "error"));
        dispatch(popupShow());
        dispatch(popupButton("Retry?", likeMessage, [id]));
      })
  }
}

export const updateMessages = (user, lastMessage) =>{
  return (dispatch, getState) => {
    let {ui} = getState()
    let {context} = ui

    let url
    if(user){
      url = `api/user/${user}/messages/?from=${lastMessage}`
    }else{
      url =`api/messages/?from=${lastMessage}`
    }
      return apiCall("get", url)
              .then((res) => {
                dispatch(updateMessageList(res, context));
                lastMessageCheck(res[res.length -1], dispatch, context)
                dispatch(removeError());
              })
              .catch((err) => {
                dispatch(addError(err, "error"));
                dispatch(popupShow());
                dispatch(popupButton("Retry?", updateMessages, [user, lastMessage]));
              });
}
}

//posts with the current user
//Backend checks login authentication and authorisation
export const postNewMessage = (text) => (dispatch, getState) => {
  let {myProfile, ui} = getState();
  let {context} = ui
  const id = myProfile.auth.userId;
  // dispatch(isLoading())
  return apiCall("post", `api/users/${id}/messages`, {text})
  .then(res => {
    dispatch(postMessage(res, context));
    dispatch(showNewMessage())
    dispatch(removeError());
    // dispatch(isLoaded())
  })
  .catch(err => {
    dispatch(addError(err, "error"));
    dispatch(popupShow());
    dispatch(popupButton("Retry?", postNewMessage, [text]));
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
