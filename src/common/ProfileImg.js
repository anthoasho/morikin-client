import React from "react";
import "./images.css";
import PreloaderIcon, {ICON_TYPE} from 'react-preloader-icon';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
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
    <Link className="img-link" to={`/u/${props.username}`} >
        <object onLoad={e => props.profileImg && (e.target.style.opacity = 1)} //If there is an error with the loading of the profile picture, the default logo will display instead
        // onError = {e => e.target.src = require("../images/logo.svg")}
        className="profile-picture"
        alt={`${props.username}'s profile `}
        data={props.profileImg ? props.profileImg : require("../images/logo.svg")}
        type="image/jpg"
        style={{
          boxShadow: `0px 0px 2px 0px ${props.profileColor? props.profileColor : randomColor()}`,
          opacity: 0.3,                                                  //This displays the logo with an opacity of 0.3 if the user does not have a profile picture
        }}
        >
          <img alt="" className="profile-picture no-img" src={require("../images/logo.svg")} />
        </object>
    </Link>
    </div>
    :
    <div className="img-wrapper">
    <button className="img-link">
    <PreloaderIcon
      className="profile-picture"
      type={ICON_TYPE.TAIL_SPIN}
      size={50}
      strokeWidth={4} // min: 1, max: 50
      strokeColor="#ae27e8"
      duration={800}
    />
    </button>
    </div>

  )
}
ProfileImg.propTypes = {
  username: PropTypes.string,
  profileImg: PropTypes.string,
  profileColor: PropTypes.string
}
export default ProfileImg;
