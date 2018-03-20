import setAuthToken from "../utils/setAuthToken";
import axios from "axios";
import jwt from "jsonwebtoken";
const APIURLSIGNUP = "https://webdevelopment-anthoasho.c9users.io:8081/api/auth/signup";
const APIURLSIGNIN = "https://webdevelopment-anthoasho.c9users.io:8081/api/auth/signin";
const APIURLGET   =   "https://webdevelopment-anthoasho.c9users.io:8081/api/messages/";
export function postNewMessage(post){
  const bearer = axios.defaults.headers.common["Authorization"];
  const config = {
    headers:{
      "Authorization": bearer
    }
  };
  const params = {
      text: post
  };
  const usertoken =localStorage.jwtToken;
  const user = jwt.decode(usertoken);
  const APIURLPOSTMSG = `https://webdevelopment-anthoasho.c9users.io:8081/api/users/${user.userId}/messages`;
  return axios.post(APIURLPOSTMSG, params, config).then(res =>{
                    /*if(res.status >= 400 && res.status <500){
                    return res.json().then(data => {
                      console.log(data);
                        let err = {errorMessage: data.message};
                        throw err;
                    });
                } */
    return res.data;
  }).catch(() =>{
    return {errorMessage: "Too many characters!"}
  });
}

export async function signUp(user){
  return axios.post(APIURLSIGNUP, {
          username: user.username,
          email: user.email,
          password: user.password,
          profileImgUrl: user.profileImgUrl
    })
    .then(res => {
            /* if(!resp.ok){
                if(resp.status >= 400 && resp.status <500){
                    return resp.json().then(data => {
                        let err = {errorMessage: data.message};
                        throw err;
                    });
                }else{
                    let err = {errorMessage: "Please try again later"};
                    throw err;
                }
            }*/
           
            const token = res.data.token;
            localStorage.setItem("jwtToken", token);
            setAuthToken(token);
            return res.data;
    }).catch(err => (console.log(err)));
}
export async function authCheck(){
  const authToken = localStorage.jwtToken; //Collects the token from the local storage in the browser instead of cookies
   if(authToken){
        return jwt.decode(authToken);
  }
}
export async function signIn(user){
  return axios.post(APIURLSIGNIN, {
          username: user.username,
          password: user.password
     })
    .then(res => {
           /* if(!resp.ok){
                if(resp.status >= 400 && resp.status <500){
                    return resp.json().then(data => {
                        let err = {errorMessage: data.message};
                        throw err;
                    });
                }else{
                    let err = {errorMessage: "Please try again later"};
                    throw err;
                }
            }*/
            const token = res.data.token;
            localStorage.setItem("jwtToken", token);
            setAuthToken(token);
            return res.data;
    });
  }
//GET ALL MESSAGES
export async function getAllMessages(start, end){
  return axios.get(APIURLGET)
    .then(res => {
            // if(!res.ok){
            //     if(res.status >= 400 && res.status <500){
            //         return res.json().then(data => {
            //             let err = {errorMessage: data.message};
            //             throw err;
            //         });
            //     }else{
            //         let err = {errorMessage: "Please try again later"};
            //         throw err;
            //     }
            // }
            return res.data.slice(start, end);
    });
}
export function getUserMessage(user){
    const APIURLGETINDMSG = `https://webdevelopment-anthoasho.c9users.io:8081/api/user/${user}/messages`;
  return axios.get(APIURLGETINDMSG)
  .then(res => {
    return res.data.slice(0, 20);
  });
}

export function deleteMessage(user, message){
  const APIURLDELETE = `https://webdevelopment-anthoasho.c9users.io:8081/api/users/${user}/messages/${message}/delete`
  return axios.put(APIURLDELETE, {
    isDeleted: true
  }).then(res => {
    return res;
  }).catch(err => {return err} )
}