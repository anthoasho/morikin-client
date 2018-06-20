import React from "react";
import {connect } from "react-redux";
import {followUser} from "../store/actions/userProfile";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
const followButton = (props) => {
  const handleFollow = () =>{
    props.followUser(props.followType)
    //FollowType is an array with [0]Username [1] Location [2] ID in list, if ![1] & ![2] normal follow action occurs
    //Extra array information is for use in lists with followbuttons for immediate update of follow status
  }

// Checks to see if the API has responded with a truthy determining following for the current user and the user of profile button

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

  //Pass in a "type" to choose the correct kind of button
  const buttonSelector = (buttonType) => {
     switch(buttonType){
    case "follow":
      return <button className={`follow-button ${props.extraClass && props.extraClass}`} onClick={handleFollow} > Follow </button>
    case "unfollow":
      return <button  className={`follow-button unfollow-button ${props.extraClass && props.extraClass}`}onClick={handleFollow} >unfollow </button>
    case "profileEdit":
      return   <Link to={`/editprofile`} style={{width: "100%", margin: "auto"}}><button  className={`follow-button unfollow-button ${props.extraClass && props.extraClass}`} style={{width: "100%", fontSize: "70%"}} onClick={props.handleProfileOptions} >Edit Profile</button></Link>
    default:
    return  <button  className={`follow-button unfollow-button`} style={{background: "gray"}}>loading...</button>
    }
  }
  return(
    props.current &&
    <div className="follow-container">
      {buttonSelector(buttonType)}
    </div>
  )
}

followButton.propTypes ={
  followType: PropTypes.array,
  username: PropTypes.string.isRequired,
  current: PropTypes.string.isRequired,


}
function mapStateToProps(state){
  return {
    current: state.myProfile.auth.username
  };
}
export default connect(mapStateToProps, {followUser})(followButton);
