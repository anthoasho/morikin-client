import React from "react";
import "./UserSmall.css";
import PreloaderIcon, {ICON_TYPE} from 'react-preloader-icon';
/*Temporary styling for colors for each user*/
function randomColor(){
  let red = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);
  return `rgb(${red}, ${blue}, ${green})`;
}

const UserSmall = ({username, profileImg, following, followUser, currentUser}) => {
  const handlefollow = () => {
    followUser(username);
  };
  return(
    <div className = "user-profile-small" >
      {profileImg && username ? 
        <div className="img-wrapper">
          <img className="profile-picture" alt={`${username}'s profile `} src={profileImg} style={{border: `2px solid ${randomColor()}`}} /> 
          {following || username === currentUser ? null :<button onClick={handlefollow} > Follow </button> /* Maybe make this a HOC*/ } 
        </div>
        : 
        <PreloaderIcon
          className="loading-icon"
          type={ICON_TYPE.TAIL_SPIN}
          size={100}
          strokeWidth={4} // min: 1, max: 50
          strokeColor="#ae27e8"
          duration={800}
        /> 
      }
      <h3 style={{borderBottom: `4px solid ${randomColor()}`}}>{username}</h3>
    </div>
    );
};
export default UserSmall;