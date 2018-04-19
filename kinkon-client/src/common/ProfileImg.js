import React from "react";
import "./images.css";
import PreloaderIcon, {ICON_TYPE} from 'react-preloader-icon';
const addDefaultSrc = (e) => {
  e.target.src = require("../images/default-profile.jpeg")
}

//A random color if the user has not specified a color, this will later become a default purple within the actual database (user.profileColor)
function randomColor(){
  let red = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);
  return `rgb(${red}, ${blue}, ${green})`;
}
const ProfileImg = (props) => {
  return(
    !props.loading ?
    <div className="img-wrapper">
      <img onError={addDefaultSrc} className="profile-picture" alt={`${props.username}'s profile `} src={props.profileImg} style={{boxShadow: `0px 0px 4px ${props.profileColor? props.profileColor : randomColor()}`, border: "2px solid #cccccc", borderBottom: `2px solid ${props.profileColor? props.profileColor : randomColor()}`}} />
    </div>
    :
    <div>
    <PreloaderIcon
      className="loading-icon"
      type={ICON_TYPE.TAIL_SPIN}
      size={100}
      strokeWidth={4} // min: 1, max: 50
      strokeColor="#ae27e8"
      duration={800}
    />
    <h3 style={{borderBottom: `4px solid ${randomColor()}`}}>{props.username}</h3>
    </div>
  )
}

export default ProfileImg;
