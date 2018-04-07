import React from 'react';
import "./Message.css";
import {Link} from "react-router-dom";
import {followUser} from "../store/actions/userProfile";
import {connect } from "react-redux";
const Follower = (props) => {
  const handlefollow = () =>{
    props.followUser(props.username, "followList", props.itemNum)
  } 
  return(
    <div className="follow-list-box item-box">
    <div className="follow-left">
      <div className="img-content follow-list-img">
        <img alt={`${props.username}'s profile `} src={props.profileImgUrl} />
      </div>
      <div>
      <Link to={`/user/${props.username}`}>
      {props.username}
      </Link>
      </div>
      </div>
      <div className="follow-right">
      {props.following?
        <button  className="follow-button follow-btn-small unfollow-button" onClick={handlefollow} >unfollow </button>:<button className="follow-button follow-btn-small" onClick={handlefollow} > Follow </button>}
        {/* CHANGE THIS BUTTON TO A SEPARATE ENTITY*/}
      </div>
    </div>
  )
}

export default connect(null, {followUser})(Follower);
