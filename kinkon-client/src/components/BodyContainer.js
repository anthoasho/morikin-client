import React from 'react';
// import Dashboard from "../containers/Dashboard";
// import UserProfile from "./UserProfile";
import Timeline from "./Timeline";
import {Link} from "react-router-dom";
import "./BodyContainer.css";
const BodyContainer = (props) => {
  if(!props.currentUser.isLoggedIn){
    return(
      <div className="landing-page">
        <div className="home-box">
          <div><h2>Welcome to Kinkon</h2></div>
          <div> <Link to="/signup"><button className="sign-up-btn">Sign Up</button></Link></div>
          <div> <Link to="/signin"><button className="sign-in-btn">Sign In</button></Link></div>
        </div>
      </div>
      );
  }
    return(
      <div className="body-container">
        <Timeline
          key={`timeline:${props.match.url}`}
          user={props.profile.user}
          url={props.match}
          {...props}
          />
      </div>
      );
};

export default BodyContainer;
