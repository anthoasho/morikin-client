import {apiCall, setAuthToken } from "../../services/api";
import { SET_CURRENT_USER } from "../actionTypes";
import {addError, removeError} from "./errors";
import {animateExit, removeAnimation} from "./animate";

export function setCurrentUser(user){
  return {
    type: SET_CURRENT_USER,
    user
  };
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
    dispatch(setCurrentUser({}));
  };
}
//Logs in with a post request
//when response is recieved, it animates away the login area and sets the token in local storage
//from that, the animation is removed and state is updated
//any errors that were present (incorrect password etc) are removed
export function authUser(type, userData){
  return dispatch => {
    return new Promise((resolve, reject) => {
      return apiCall("post", `/api/auth/${type}`, userData)
        .then(({token, ...user}) => {
          dispatch(animateExit())
          localStorage.setItem("jwtToken", token)
          return {token, ...user}
          })
          .then(({token, ...user}) => {
            setTimeout(() => {
              dispatch(removeAnimation());
              setAuthorizationToken(token);
              dispatch(setCurrentUser(user));
              dispatch(removeError());
              resolve();
            }, 500)
        })
        .catch(err => {
          dispatch(addError(err.errors));
          reject();
        });
    });
  };
}
