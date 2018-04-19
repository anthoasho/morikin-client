import React from "react";
import "./UserSmall.css";
import {UserMetaGroup} from "../containers/UserMetaGroup";
import FollowButton from "../common/FollowButton";
import ProfileImg from "../common/ProfileImg";
const UserSmall = ({currentUser, loading, profile}) => {
  if(!loading){
    let {username, following, profileImgUrl, profileColor, description, displayName} = profile;
    return(
      <div className = "user-profile-small" >
        <ProfileImg
          username={username}
          profileImg= {profileImgUrl}
          profileColor={profileColor}
          loading={loading}
        />
        <div className="user-follow">
        <p style={{color:"gray", fontSize:"0.9rem", padding:"0 0 0 3px", textAlign:"right", margin:"0 0 5px"}}> @{username}  </p>
          <h3 style={{borderBottom: `4px solid ${profileColor}`, margin: "0"}}>{displayName}</h3>
          <p className="profile-description">{description}</p>
          <FollowButton username={username} current={currentUser} followType={[username]} following={following} />
        </div>
        <UserMetaGroup
          profile={profile}
          username={username}
        />
      </div>
    );
  }else{
    return(
      <div>Loading..</div>
      );
    }
};
export default UserSmall;
