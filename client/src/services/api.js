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
export function apiCall(method, path, data){
  return new Promise((resolve, reject) => {
    return axios[method](path, data)
    .then(res => {
      return resolve(res.data);
    })
    .catch(err => {
      console.log(err);
      return reject(err.response.data);
    });
  });
}
