import React, { Component } from 'react';
import SignUpForm from "./SignUpForm";
import {BrowserRouter as Route, Switch} from "react-router-dom";
import LoginForm from "./LoginForm";
import "./Login.css";
import * as apiCalls from "./api/Api";
class Login extends Component {
  constructor(props){
    super(props);
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
  }
  async signUp(user){
    await apiCalls.signUp(user).then(user => (this.props.onLogin(user)))
    .catch(err => {
      console.log(err);
      this.setState({
        error: err
      });
    });
  }
  async signIn(user){
    await apiCalls.signIn(user)
    .then(res => {
      this.props.onLogin(res);

    })
    .catch(err => {
      console.log(err);
      this.setState({
        error: err
      });
    });
  }
  render(){
    return(
      <div>
          <Switch>
            <Route path ="/signup"> 
              <SignUpForm 
                signUp = {this.signUp}/>
            </Route>
            <Route path ="/login">
              <LoginForm
                signIn = {this.signIn}
              />
            </Route>
          </Switch>
      </div>
      );
  }
}

export default Login;
