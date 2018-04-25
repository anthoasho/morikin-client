/* This really needs to be cleaned up - find a way to split this into other files */
import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import {configureStore} from "../store";

import Main from "./Main";
import "../common/common.css";
import {setAuthorizationToken, setCurrentUser } from "../store/actions/auth";
import jwt from "jsonwebtoken";
const store = configureStore();
//Check the local storage for a token, if present auto-login
//This token currently has no expiration, but upon logout it is removed (SEE NAVBAR)
if(localStorage.jwtToken){
  setAuthorizationToken(localStorage.jwtToken);
  try{
    store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
  } catch(e){
    store.dispatch(setCurrentUser({}));
  }
}
const App = () => (
  <Provider store = {store}>
    <Router>
        <Main />
    </Router>
  </Provider>
  );
export default App;
