/*
export default function setAuthToken(token){
let authHeader = new Headers();
  if(token){
    authHeader.append("Authorisation", `Bearer ${token}`)
    
  }else {
    authHeader.delete("Authorisation");
  }
}

*/

import axios from "axios";
export default function setAuthToken(token){
  if(token){
    axios.defaults.headers.common["Authorization"] =  `Bearer ${token}`;
  }else {
    delete axios.defaults.headers.common["Authorization"];
  }
}
