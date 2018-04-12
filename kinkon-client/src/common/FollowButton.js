import React from "react";
import {connect } from "react-redux";
import {followUser} from "../store/actions/userProfile";
import {Link} from "react-router-dom";
const followButton = (props) => {
  const handleFollow = () =>{
    props.followUser(props.followType)
  }
  const handleProfileOptions =() => {
  }
  const following = () => {
    if(props.following){
      return "unfollow"
    }else if(props.username === props.current){
      return "profileEdit"
    }
    else{
      return "follow";
    }
  }
  const buttonType = following();
  const buttonSelector = (buttonType) => {
     switch(buttonType){
    case "follow":
      return <button className={`follow-button ${props.extraClass && props.extraClass}`} onClick={handleFollow} > Follow </button>
    case "unfollow":
      return <button  className={`follow-button unfollow-button ${props.extraClass && props.extraClass}`}onClick={handleFollow} >unfollow </button>
    case "profileEdit":
      return   <Link to={`/editprofile`} style={{width: "80%", margin: "auto"}}><button  className={`follow-button unfollow-button ${props.extraClass && props.extraClass}`} style={{width: "100%"}} onClick={handleProfileOptions} >Edit Profile</button></Link>
    default:
    return  <button  className={`follow-button unfollow-button`} style={{background: "gray"}}>loading...</button>
  }
}
return(
  <div className="follow-container">
  {buttonSelector(buttonType)}
  </div>
)
}

export default connect(null, {followUser})(followButton);
