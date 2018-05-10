import React from "react";
import "./images.css";
import PreloaderIcon, {ICON_TYPE} from 'react-preloader-icon';
import {Link} from "react-router-dom";
const addDefaultSrc = (e) => {
  e.target.src = require("../images/logo.svg");
  e.target.style = "opacity: 0.3"
}
// const profileImgCheck (e) => {
//   if(props.profileImg.length() < 1) {
//      return addDefaultSrc(e)
//    }
//    else{
//       return props.profileImg
//    }
// }
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
    <Link className="img-link" to={`/${props.username}`} >
        <img onError={addDefaultSrc} //If there is an error with the loading of the profile picture, the default logo will display instead
        className="profile-picture"
        alt={`${props.username}'s profile `}
        src={props.profileImg ? props.profileImg : require("../images/logo.svg")}
        style={{
          boxShadow: `0px 0px 4px ${props.profileColor? props.profileColor : randomColor()}`,
          opacity: props.profileImg ? 1 : 0.3,                                                  //This displays the logo with an opacity of 0.3 if the user does not have a profile picture
          borderBottom: `2px solid ${props.profileColor? props.profileColor : randomColor()}`,
          border: props.profileImg ? 0 :"2px solid #cccccc"}}
        />
    </Link>
    </div>
    :
    <div className="img-wrapper">
    <a className="img-link">
    <PreloaderIcon
      className="profile-picture"
      type={ICON_TYPE.TAIL_SPIN}
      size={50}
      strokeWidth={4} // min: 1, max: 50
      strokeColor="#ae27e8"
      duration={800}
    />
    </a>
    </div>

  )
}

export default ProfileImg;
