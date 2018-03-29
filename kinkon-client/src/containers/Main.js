import React from "react";
import {Switch, Route, withRouter} from "react-router-dom";
import {connect } from "react-redux";
import BodyContainer from "../components/BodyContainer";
import AuthForm from "../components/AuthForm";
import {authUser } from "../store/actions/auth";
import {fetchMessages} from "../store/actions/messages";
import { removeError } from "../store/actions/errors";
import NewMessage from "./NewMessage";
import withAuth from "../hocs/withAuth";
const Main = props => {
  const {authUser, errors, removeError, currentUser } = props;
  return(
      <div className="container">
        <Switch> 
          <Route exact path = "/" render={props => 
            <BodyContainer 
              currentUser={currentUser} 
              profile={currentUser} 
              {...props} 
            />} 
          />
          <Route path="/user/:id/" render={props => 
            <BodyContainer
              currentUser={currentUser} 
              profile={currentUser} 
              {...props} 
              />} 
            /> 
          <Route exact path = "/signin" render={props => {
            return(
              <AuthForm 
                removeError={removeError} 
                errors={errors} 
                onAuth={authUser} 
                buttonText="Log in" 
                heading="Welcome!" 
                {...props} 
              /> 
            );
          }} />
            <Route exact path = "/signup" render={props => {
              return(
                <AuthForm 
                  removeError={removeError} 
                  errors={errors} 
                  signUp 
                  onAuth={authUser}  
                  buttonText="Sign Up!" 
                  heading="Join today!" 
                  {...props} 
                /> 
              );
            }} />
          <Route exact path="/new" component={withAuth(NewMessage)} />
        </Switch>
      </div>
    );
};

function mapStateToProps(state){
  return { 
    currentUser: state.currentUser,
    errors: state.errors
  };
}

export default withRouter(connect(mapStateToProps, {authUser, removeError})(Main));