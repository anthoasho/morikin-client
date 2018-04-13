import React from "react";
import {Switch, Route, withRouter} from "react-router-dom";
import {connect } from "react-redux";
import BodyContainer from "../components/BodyContainer";
import AuthForm from "../components/AuthForm";
import {authUser } from "../store/actions/auth";
import { removeError } from "../store/actions/errors";
import EditProfile from "../components/EditProfile.js"
import NewMessage from "./NewMessage";
import withAuth from "../hocs/withAuth";
const Main = props => {
  const {authUser, errors, removeError, currentUser } = props;
  return(
      <div className="container">
        <Switch>
        <Route exact path="/:id/followers" render={props =>
          <BodyContainer
            currentUser={currentUser}
            profile={currentUser}
            {...props}
            follow
          />
        }
        />
        <Route exact path="/:id/following" render={props =>
          <BodyContainer
            currentUser={currentUser}
            profile={currentUser}
            {...props}
            follow
          />
        }
        />
          <Route exact path = "/" render={props =>
            <BodyContainer
              currentUser={currentUser}
              profile={currentUser}
              {...props}
            />}
          />
          <Route exact path="/new" component={withAuth(NewMessage)} />
          <Route exact path ="/editprofile" component={withAuth(EditProfile)}
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
            <Route path="/:id/" render={props =>
              <BodyContainer
                currentUser={currentUser}
                profile={currentUser}
                {...props}
                />}
              />
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
