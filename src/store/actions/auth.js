import {apiCall, setAuthToken } from "../../services/api";
import { SET_CURRENT_USER } from "../actionTypes";
import {addError, popupShow, popupButton, popupHide} from "./errors";
import {isLoading, isLoaded} from "./UI";

export function setCurrentUser(user){
  return {
    type: SET_CURRENT_USER,
    user
  };
}
export function userLogout(){
  return {
    type: "USER_LOGOUT"
  }
}
export function setAuthorizationToken(token){
  setAuthToken(token);
}
//Remove the token and authorisaiton from local storage and headers respecively
//Sets current user to be empty, thus automatically logging out
export function logout(){
  return dispatch =>{
    localStorage.removeItem("jwtToken");
    setAuthorizationToken(false);
    dispatch(userLogout());
  };
}

//Logs in with a post request
//when response is recieved, it animates away the login area and sets the token in local storage
//from that, the animation is removed and state is updated
//any errors that were present (incorrect password etc) are removed
export function authUser(type, userData){
  return dispatch => {
    return new Promise((resolve, reject) => {
        dispatch(isLoading())
      return apiCall("post", `api/auth/${type}`, userData)
        .then(({token, ...user}) => {
          dispatch(isLoaded())
          localStorage.setItem("jwtToken", token)
          return {token, ...user}
          })
          .then(({token, ...user}) => {
            setTimeout(() => {
              setAuthorizationToken(token);
              dispatch(setCurrentUser(user));
              dispatch(popupShow())
              dispatch(addError({message: "Welcome"}, "info"));
              dispatch(popupButton("Close", popupHide))
              resolve();
            }, 500)
        })
        .catch(err => {
          dispatch(addError(err));
          dispatch(isLoaded())
          reject();
        });
    });
  };
}
