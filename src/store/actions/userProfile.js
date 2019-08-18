import {apiCall, setAuthToken } from "../../services/api";
import {addError, removeError, popupShow, popupButton, popupHide} from "./errors";
import {updateLikeList, loadMessages, lastMessageCheck} from "./messages";
import {isLoading, isLoaded} from "./UI";
import {LOAD_USER_PROFILE, LOAD_USER_FOLLOW, UPDATE_USER_PROFILE, UPDATE_FOLLOW_LIST, UPDATE_CURRENT_USER, FETCHING_PROFILE, GET_DISCOVER_USERS, CLEAR_FOLLOW} from "../actionTypes";

export const loadProfile = (user, context) => ({
  type: LOAD_USER_PROFILE,
  user,
 context
});
export const fetchingProfile = () => ({
  type: FETCHING_PROFILE
})
export const updateCurrentUser = (user, context) => ({
  type: UPDATE_CURRENT_USER,
  user
})
export const updateProfile = (update, context) => ({
  type: UPDATE_USER_PROFILE,
  update,
  context
})
export const loadFollow = users => ({
  type: LOAD_USER_FOLLOW,
  users
})
export const clearFollow = () => ({
  type: CLEAR_FOLLOW
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
  return (dispatch, getState) => {
    let {myProfile} = getState();
    if(myProfile.auth.isLoggedIn){
    return apiCall("get", "api/discover/users")
    .then(res => {
      dispatch(discoverUsers(res));
    })
    .catch(err => {
      dispatch(addError(err, "error"));
    })
  }
}
}

export const getUserProfile = (username) => {
  return (dispatch, getState) => {
    let {myProfile, ui} = getState()
    let {context}  = ui;
    let usernameCurrent = myProfile.auth.username
    let apiUrl = {              //If More urls need to be added, they can be done so here
      dashboard: {
        messages: `api/messages/`,
        profile: `api/user/${usernameCurrent}`
      },
      profile: {
        messages: `api/user/${username}/messages/`,
        profile: `api/user/${username}`
      },
      myProfile:{
        messages: `api/user/${usernameCurrent}/messages/`,
        profile: `api/user/${usernameCurrent}`
      }
    }
    let callDetails
    if(  !usernameCurrent && !username ){
      apiUrl.dashboard.messages = "api/messages/allMessages/";
      callDetails = [apiCall("get", apiUrl[context].messages)]
    }else{
      callDetails = [apiCall("get", apiUrl[context].messages), apiCall("get", apiUrl[context].profile)]
    }
    if((getState()[context].messages.data.length < 1) || ((context === "profile") && (getState().profile.profile.username !== username)) ){
      dispatch(isLoading());
      Promise.all(callDetails)
      .then((res) => {
        dispatch(loadMessages(res[0], context));
        lastMessageCheck(res[0][res[0].length -1], dispatch, context)
        dispatch(loadProfile(res[1], context));
        dispatch(removeError());
        dispatch(popupHide());
        dispatch(isLoaded());
    })
    .catch((err) => {
      console.log(err)
        dispatch(popupShow())
        dispatch(addError(err, "error"));
        if(err.code === 404){
          dispatch(popupButton("Go Back"))
        }else{
          dispatch(popupButton("Retry?", getUserProfile, [username]))
        }
        dispatch(isLoaded());

    });
  }
  }
}
export const retry = (func, args)=>{
    return func.apply(null, args)
}


//Collects the list of followers/following
//url is passed as an argument to clarify following || followers
export const getFollowList = (url) => {
  return dispatch => {
    return apiCall("get", `api/user/${url}`)
      .then((res) => {
        dispatch(loadFollow(res));
        dispatch(removeError());
      })
      .catch((err) => {
        dispatch(addError(err, "error"));

      })
  }
}

export const clearFollowList = () => {
  return dispatch => {
    dispatch(clearFollow());
  }
}

//Edits part of the profile (not the password currently - TODO)
//Upon edit, it will update the token within the local storage
export const editProfile = (userData, next) => (dispatch, getState) => {
  let {ui} = getState()
  let {context}  = ui;
  return apiCall("post", `api/user/updateprofile`, {userData})
  .then(res => {
    localStorage.setItem("jwtToken", res.token)
    dispatch(updateCurrentUser(res.response, context));
    dispatch(removeError());
  })
  .then(() => {
    next();
  })
  .catch(err => {
    dispatch(addError(err, "error"));
    dispatch(popupShow());
    dispatch(popupButton("Retry?", editProfile, [userData, next]));
  });
};

export const followUser = ([userId, location, itemNum]) => {
  return (dispatch, getState) => {
    let {ui} = getState()
    let {context} = ui
    return apiCall("post", `api/user/${userId}/follow`)
    .then((res) => {
      if(location==="followList"){
        dispatch(updateFollowList(res.following, itemNum));
        dispatch(removeError());
      }else if(location ==="likesList"){
        dispatch(updateLikeList(res.following, itemNum, context));
        dispatch(removeError());
      }
        else{
      dispatch(updateProfile(res, context));
      dispatch(removeError());
    }
     })
    .catch(err =>{
      dispatch(addError(err, "error"));
      dispatch(popupShow());
      dispatch(popupButton("Retry?", followUser, [userId, location, itemNum]));
    });
  };
};


/*

OLD CODE FOR REFERENCE

*/


//This is used to get the profile of the user (not including messages, that is a seperate API call)
// export const getUserProfile = (username) => {
//   return dispatch => {
//     dispatch(isLoading());
//     return apiCall("get", `/api/user/${username}`) //This previously used the ID of the user, I may revert if necessary.
//     .then((res) => {
//       dispatch(loadProfile(res));
//       dispatch(removeError());
//       dispatch(isLoaded());
//     })
//     .catch((err) => {
//       dispatch(addError(err));
//     });
//   };
// };
