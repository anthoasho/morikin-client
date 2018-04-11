import React from "react";
import "./UserSmall.css";
import {UserMetaGroup} from "../containers/UserMetaGroup";
import FollowButton from "../common/FollowButton";
import ProfileImg from "../common/ProfileImg";
const UserSmall = ({currentUser, loading, profile}) => {
  if(!loading){
    let {username, following, profileImgUrl, profileColor} = profile;
    return(
      <div className = "user-profile-small" >
        <ProfileImg
          username={username}
          profileImg= {profileImgUrl}
          profileColor={profileColor}
          loading={loading}
        />
        <div className="user-follow">
          <h3 style={{borderBottom: `4px solid ${profileColor}`}}>{username}</h3>
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
