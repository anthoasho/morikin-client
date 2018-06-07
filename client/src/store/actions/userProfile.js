import {apiCall, setAuthToken } from "../../services/api";
import {addError, removeError} from "./errors";
import {updateLikeList, loadMessages, lastMessageCheck} from "./messages";
import {isLoading, isLoaded} from "./UI";
import {LOAD_USER_PROFILE, LOAD_USER_FOLLOW, UPDATE_USER_PROFILE, UPDATE_FOLLOW_LIST, UPDATE_CURRENT_USER, FETCHING_PROFILE, GET_DISCOVER_USERS, CLEAR_FOLLOW} from "../actionTypes";

export const loadProfile = user => ({
  type: LOAD_USER_PROFILE,
  user
});
export const fetchingProfile = () => ({
  type: FETCHING_PROFILE
})
export const updateCurrentUser = user => ({
  type: UPDATE_CURRENT_USER,
  user
})
export const updateProfile = update => ({
  type: UPDATE_USER_PROFILE,
  update
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
  return dispatch => {
    return apiCall("get", "/api/discover/users")
    .then(res => {
      dispatch(discoverUsers(res));
    })
  }
}

//In process of making this function to collect user profile etcetera on profile open
//Dashboard shall be separate
//Own profile maybe separate too?

//I really want three separate states; Dashboard, currentUser and viewing profile.
//It's a difficult problem I have been working on and failing multiple times
//TODO everything


export const getUserProfile = (url, username) => {
  return (dispatch, getState) => {
    let {currentUser} = getState()
    let usernameCurrent = currentUser.user.username
    let apiUrl = {              //If More urls need to be added, they can be done so here
      dashboard: {
        messages: `/api/messages/`,
        profile: `/api/user/${usernameCurrent}`
      },
      profile: {
        messages: `/api/user/${username}/messages/`,
        profile: `/api/user/${username}`
      }
    }
    dispatch(isLoading());
    Promise.all([apiCall("get", apiUrl[url].messages), apiCall("get", apiUrl[url].profile)])
    .then((res) => {
      dispatch(loadMessages(res[0]));
        lastMessageCheck(res[0][res[0].length -1], dispatch)
      dispatch(loadProfile(res[1]));
      dispatch(removeError());
      dispatch(isLoaded());
    })
    .catch((err) => {
      dispatch(addError(err));
    });
  }
}

//Collects the list of followers/following
//url is passed as an argument to clarify following || followers
export const getFollowList = (url) => {
  return dispatch => {
    return apiCall("get", `/api/${url}`)
      .then((res) => {
        dispatch(loadFollow(res));
        dispatch(removeError());
      })
      .catch((err) => {
        dispatch(addError(err));
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
export const editProfile = userData => (dispatch) => {
  return apiCall("post", `/api/user/updateprofile`, {userData})
  .then(res => {
    localStorage.setItem("jwtToken", res.token)
    dispatch(updateCurrentUser(res.response));
    dispatch(removeError());
  })
  .catch(err => {
    dispatch(addError(err));
  });
};

//This took a long time, this is intended to handle an update in both the user profile and follow followList
//TODO - Make this more reusable with context in the reducer
export const followUser = ([userId, location, itemNum]) => {
  return dispatch => {
    return apiCall("post", `/api/${userId}/follow`)
    .then((res) => {
      if(location==="followList"){
        dispatch(updateFollowList(res.following, itemNum));
        dispatch(removeError());
      }else if(location ==="likesList"){
        dispatch(updateLikeList(res.following, itemNum));
        dispatch(removeError());
      }
        else{
      dispatch(updateProfile(res));
      dispatch(removeError());
    }
     })
    .catch(err =>{
      dispatch(addError(err.errors.message));
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
