import axios from "axios";
//Function to set an authorisation token, if the token argument is empty it removes any authorisation
export function setAuthToken(token){
  if(token){
    axios.defaults.headers.common["Authorization"] =  `Bearer ${token}`;
  }else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

//Typical Api call used throughout requests on the front end
export function apiCall(method, path, data, attempt = 1){
  let apiUrl = process.env.REACT_APP_API;
  return new Promise(function withRetry(resolve, reject){
    axios[method](`${apiUrl}${path}`, data)
    .then(res => {
      resolve(res.data)
    })
    .catch(err => {
      if(attempt > 2) {
        reject(err.response ? err.response : {statusText: "Something went wrong", status: 520})
      } else {
          attempt+=1;
          withRetry(resolve, reject);
      }
    })
  });
}
