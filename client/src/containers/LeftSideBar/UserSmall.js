import React from "react";
import PropTypes from "prop-types";
import "./UserSmall.css";
import {UserMetaGroup} from "./UserMetaGroup";
import FollowButton from "../../common/FollowButton";
import ProfileImg from "../../common/ProfileImg";
import ListUsers from "../../common/ListUsers";
import classNames from "classnames";
import {connect} from "react-redux";

//User profile area on the left of the main timeline
//adapts to the url following a fetch request
//Has automatic updating of the follow button and can distinguish current user (to display a edit profile button)
const UserSmall = ({currentUser, profile, ui, isMobile}) => {
  if(profile.loading || !profile.user.username){
   return(
       <div className = "user-profile-container" >
     <div className = "user-profile-small" >
       <ProfileImg
         loading={profile.loading}
       />
       <div className="user-follow">
       <p style={{color:"gray", fontSize:"0.9rem", padding:"0 0 0 3px", textAlign:"right", margin:"0 0 5px 50px"}}> Loading  </p>

       </div>
      </div>
     </div>
     );
   }
    let {username, following, profileImgUrl, profileColor, description, displayName} = profile.user;

    return(
      <div className = "user-profile-container" >
        <div className = "user-profile-small" >
          <ProfileImg
            username={username}
            profileImg= {profileImgUrl}
            profileColor={profileColor}
            loading={false}
          />
          <div className="user-follow">
          <p className="user-profile-username" style={{color:"gray", fontSize:"0.9rem", padding:"0 0 0 3px", textAlign:"right", margin:"0 0 5px"}}> @{username}  </p>
            <h3 className="user-profile-display-name" style={{borderBottom: `2px solid ${profileColor}`, margin: "0"}}>{displayName}</h3>
            <p className={classNames({"profile-description": true,  "hidden": (ui.display && !isMobile)})}>{description}</p>
            <FollowButton username={username} current={currentUser} followType={[username]} following={following} />
          </div>
          <UserMetaGroup
            profile={profile.user}
            username={username}
          />
        </div>
         {ui.display && <ListUsers type="follow" /> }
      </div>
    )
};

UserSmall.propTypes ={
  ui: PropTypes.object,
  profile: PropTypes.object,
  isMobile: PropTypes.bool,
  currentUser: PropTypes.string,

}
function mapStateToProps(state){
  return {
    ui: state.ui.follow,
    profile: state.userProfile,
    currentUser:state.currentUser.username,
    isMobile: state.ui.isMobile
  };
}

export default connect(mapStateToProps)(UserSmall);
