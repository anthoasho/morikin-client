import React from 'react';
import Timeline from "./Timeline";
import {Link} from "react-router-dom";
import {Button} from "../common/Button";
import "./BodyContainer.css";
const BodyContainer = (props) => {
  if(!props.currentUser.isLoggedIn){
    return(
      <div className="landing-page">
        <div className="home-box">
          <div><h2>Welcome to Kinkon</h2></div>
          <div> <Link to="/signup"><Button type="signup" text="Sign Up" /></Link></div>
          <div> <Link to="/signin"><Button type="signin" text="Sign in"/></Link></div>
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
