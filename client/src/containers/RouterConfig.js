import React from "react";
import PropTypes from "prop-types";
import {Switch, Route, withRouter} from "react-router-dom";
import {connect } from "react-redux";
import BodyContainer from "./BodyContainer";
import {TabNav} from "./Mobile/Tab";
import "./Mobile/mobile.css";
import Navbar from "./Navbar";
import EditProfile from "./settings/EditProfile.js"
import NewMessage from "./Messages/NewMessage";
import withAuth, {apiHOC} from "../hocs/withAuth";
import LandingPage from "./home/Landing";
import Discover from "./RightSideBar/Discover";

//React Router config
const RouterConfig = props => {
  const {currentUser } = props;
  return(
    currentUser.isLoggedIn ?
      <div className="container">
       <Navbar history={props.history} location={props.location} />
        <Switch>
          <Route exact path = "/" component={BodyContainer} />
          <Route exact path="/new" component={withAuth(NewMessage)} />
          <Route exact path ="/editprofile" component={withAuth(EditProfile)} />
          <Route exact path = "/discover" component={apiHOC(Discover)} />
          <Route path="/:id/" component={BodyContainer}/>
        </Switch>
         <TabNav history={props.history}   currentUser={currentUser.user.username} isMobile={props.isMobile} />
      </div>
      :
      <Route path="/" render={props =>
        <LandingPage {...props} />
      } />
    );
};

RouterConfig.propTypes = {
  currentUser: PropTypes.object
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
    errors: state.errors,
    isMobile: state.ui.isMobile
  };
}

export default withRouter(connect(mapStateToProps)(RouterConfig));




/*<Route exact path="/:id/followers" render={props =>
  <BodyContainer
    currentUser={currentUser}
    profile={currentUser}
    {...props}
    follow="follow"
    title="Followers"
  />
}
/>
<Route exact path="/:id/following" render={props =>
  <BodyContainer
    currentUser={currentUser}
    profile={currentUser}
    {...props}
    follow="follow"
    title="Following"
  />
}
/>

<Route path="/message/:mid/likes" render={props =>
  <FollowList
    url={props.match.url}
    key={`123`}
    history={props.history}
    type={"likes"}
    title="Likes"
  />
} />
*/
