import React from "react";
import "./UserSmall.css";
import {UserMetaGroup} from "../containers/UserMetaGroup";
import FollowButton from "../common/FollowButton";
import ProfileImg from "../common/ProfileImg";
function randomColor(){
  let red = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);
  return `rgb(${red}, ${blue}, ${green})`;
}

const UserSmall = ({currentUser, loading, profile}) => {
  if(!loading){
    let {username, following, profileImgUrl} = profile;
    return(
      <div className = "user-profile-small" >
        <ProfileImg
          username={username}
          profileImg= {profileImgUrl}
          loading={loading}
        />
        <div className="user-follow">
          <h3 style={{borderBottom: `4px solid ${randomColor()}`}}>{username}</h3>
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
