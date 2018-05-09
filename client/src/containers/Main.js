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
import FollowList from "../components/FollowList";
//"Main" handles most of the URL with react-router - It should be renamed.
const Main = props => {
  const {currentUser } = props;
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
            follow="follow"
          />
        }
        />
        <Route exact path="/:id/following" render={props =>
          <BodyContainer
            currentUser={currentUser}
            profile={currentUser}
            {...props}
            follow="follow"
          />
        }
        />

        <Route path="/message/:mid/likes" render={props =>
          <FollowList
            url={props.match.url}
            key={`123`}
            history={props.history}
            type={"likes"}
          />
        } />
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
      <Route path="/" render={props =>
        <LandingPage {...props} />
      } />
    );
};

function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
    errors: state.errors
  };
}

export default withRouter(connect(mapStateToProps, {removeError})(Main));
