import React from "react";
import "./UserSmall.css";
import {UserMetaGroup} from "../containers/UserMetaGroup";
import FollowButton from "../common/FollowButton";
import ProfileImg from "../common/ProfileImg";
import FollowList from "../components/FollowList";
import {connect} from "react-redux";

//User profile area on the left of the main timeline
//adapts to the url following a fetch request
//Has automatic updating of the follow button and can distinguish current user (to display a edit profile button)
const UserSmall = ({currentUser, profile, ui}) => {
  if(profile.loading || !profile.user.username){
   return(
       <div className = "user-profile-container" >
     <div className = "user-profile-small" >
       <ProfileImg
         loading={profile.loading}
       />
       <div className="user-follow">
       <p style={{color:"gray", fontSize:"0.9rem", padding:"0 0 0 3px", textAlign:"right", margin:"0 0 5px"}}> Loading  </p>
         <h3 style={{borderBottom: `4px solid purple`, margin: "0"}}>...</h3>
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
        <p style={{color:"gray", fontSize:"0.9rem", padding:"0 0 0 3px", textAlign:"right", margin:"0 0 5px"}}> @{username}  </p>
          <h3 style={{borderBottom: `4px solid ${profileColor}`, margin: "0"}}>{displayName}</h3>
          <p className="profile-description">{description}</p>
          <FollowButton username={username} current={currentUser} followType={[username]} following={following} />
        </div>
        <UserMetaGroup
          profile={profile.user}
          username={username}
        />
        </div>
         {ui.display && <FollowList /> }
      </div>
    )

};
function mapStateToProps(state){
  return {
    ui: state.ui.follow
  };
}

export default connect(mapStateToProps, null)(UserSmall);
