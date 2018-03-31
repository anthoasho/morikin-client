import React from "react";
import "./UserSmall.css";
import {UserMeta} from "../containers/userMeta";
import PreloaderIcon, {ICON_TYPE} from 'react-preloader-icon';
/*Temporary styling for colors for each user*/
function randomColor(){
  let red = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);
  return `rgb(${red}, ${blue}, ${green})`;
}

const UserSmall = ({username, profileImg, following, followUser, currentUser, loading, profile}) => {
  const handlefollow = () => {
    followUser(username);
  };
  return(
    !loading ? 
      <div className = "user-profile-small" >
        <div className="img-wrapper">
          <img className="profile-picture" alt={`${username}'s profile `} src={profileImg} style={{border: `2px solid ${randomColor()}`}} /> 
        </div>
        <div className="user-follow">
        <h3 style={{borderBottom: `4px solid ${randomColor()}`}}>{username}</h3>
        {following || username === currentUser ?<button  className="follow-button unfollow-button" onClick={handlefollow} >unfollow </button>:<button className="follow-button" onClick={handlefollow} > Follow </button> /* Maybe make this a HOC*/ } 
        </div>
        <div className="user-meta">
          <UserMeta 
            text="Posts"
            data={profile.messageCount}
            classDefine="user-meta-item"/>
          <UserMeta 
            text="Followers"
            data={profile.followerCount}
            classDefine="user-meta-item meta-mid" />
            
          <UserMeta 
            text="Following"
            data={profile.followingCount}
            classDefine="user-meta-item"/>
        </div>
      </div>
      : 
      <div className = "user-profile-small" >
        <PreloaderIcon
          className="loading-icon"
          type={ICON_TYPE.TAIL_SPIN}
          size={100}
          strokeWidth={4} // min: 1, max: 50
          strokeColor="#ae27e8"
          duration={800}
        /> 
        <h3 style={{borderBottom: `4px solid ${randomColor()}`}}>{username}</h3>
      </div>
    );
};
export default UserSmall;