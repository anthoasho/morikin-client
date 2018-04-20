import React from "react";
import {Switch, Route, withRouter} from "react-router-dom";
import {connect } from "react-redux";
import BodyContainer from "./BodyContainer";
import Navbar from "./Navbar";
import { removeError } from "../store/actions/errors";
import EditProfile from "../components/EditProfile.js"
import NewMessage from "../components/NewMessage";
import withAuth from "../hocs/withAuth";
import LandingPage from "../components/Landing";
//"Main" handles most of the URL with react-router - It should be renamed.
const Main = props => {
  const {currentUser } = props;
  console.log(props)
  return(
    currentUser.isLoggedIn ?
      <div className="container">
      <Navbar history={props.history} location={props.location} />
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
            <Route path="/:id/" render={props =>
              <BodyContainer
                currentUser={currentUser}
                profile={currentUser}
                {...props}
                />}
              />
        </Switch>
      </div>
      :
      <LandingPage {...props} />
    );
};

function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
    errors: state.errors
  };
}

export default withRouter(connect(mapStateToProps, {removeError})(Main));
