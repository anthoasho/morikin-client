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
import Sidebar from "./settings/sidebar.js";
import styled from "styled-components";
//React Router config

let StyledA = styled.a`
color: black;
padding: 10px;
color: white;


`
let LinkToPortfolio = styled.div`
position: fixed;
right: ${props => props.isMobile ?"30px" : "30px"};
left:  ${props => props.isMobile?"30px" : "auto"};
bottom: 70px;
width: auto;
height: auto;
box-shadow: 3px 2px 4px #00000080;
background: white;
border-radius: 10px;
color: black;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
font-size: 1em;
text-align: center;
background: #FF7972;
&:hover {
  background: white
  ${StyledA}{
    color: black;
  }
}


`



const RouterConfig = props => {
  const {currentUser } = props;
  return(
    currentUser.isLoggedIn ?
      <div className="container">
         <Navbar history={props.history} location={props.location} match={props.match} />
         <Sidebar  history={props.history} isMobile={props.isMobile} currentUser={props.currentUser.isLoggedIn}/>
         <Route exact path ="/editprofile" component={withAuth(EditProfile)} />
        <Switch>
          <Route exact path="/new" component={withAuth(NewMessage)} />
          <Route exact path ="/discover" component={apiHOC(Discover)} />
          <Route exact path="/signin" render={props =>  <LandingPage {...props} /> } /> {/* These are both present to prevent a bug which the route */}
          <Route exact path="/signup" render={props =>  <LandingPage {...props} /> } />{/*"/:id/" tries to do an API call on "signin" / "signup" after auth */}
          <Route path="/myprofile" render = { props => <BodyContainer page={"myProfile"} user={currentUser.username}  /> } />
          <Route path="/u/:id/" render = { props => <BodyContainer page={"profile"}  /> } />
          <Route path = "/" render = { props => <BodyContainer page={"dashboard"}  /> } />
        </Switch>
         <TabNav history={props.history}   currentUser={currentUser.username} isMobile={props.isMobile} context={props.context}/>
      </div>
      :
      <div className="container">
        <Navbar history={props.history} location={props.location} match={props.match} />
        <Sidebar  history={props.history} isMobile={props.isMobile} currentUser={props.currentUser.isLoggedIn}/>
        <LinkToPortfolio isMobile={props.isMobile}> <StyledA  href="https://anthonyashurst.com">Return to anthonyashurst.com </StyledA> </LinkToPortfolio>
        <Switch>
        <Route exact path="/signin" render={propstwo =>  <LandingPage  locationState="signin" {...props} /> } />
        <Route exact path="/signup" render={propstwo =>  <LandingPage  locationState="signup" {...props} /> } />
        <Route path="/u/:id/" render = { props => <BodyContainer page={"profile"}  /> } />
        <Route exact path="/" render={propstwo =>
          <BodyContainer page={"dashboard"}  />
        } />
      </Switch>
      </div>

    );
};

RouterConfig.propTypes = {
  currentUser: PropTypes.object
}

function mapStateToProps(state){
  return {
    currentUser: state.myProfile.auth,
    errors: state.errors,
    isMobile: state.ui.isMobile,
    context: state.ui.context,
    sidebarShow: state.ui.sidebarShow
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
