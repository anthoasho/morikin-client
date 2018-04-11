import React from 'react';
import "./Message.css";
import {Link} from "react-router-dom";
import FollowButton from "../common/FollowButton";
import ProfileImg from "../common/ProfileImg"
const Follower = (props) => {
  return(
    <div className="follow-list-box item-box">
    <div className="follow-left">
    <ProfileImg
      username={props.username}
      profileImg= {props.profileImgUrl}
    />
      <div>
      <Link to={`/user/${props.username}`}>
      {props.username}
      </Link>
      </div>
      </div>
      <div className="follow-right">
        <FollowButton username={props.username} current={props.currentUser.current} followType={[props.username, "followList", props.itemNum]} extraClass={"follow-btn-small"}following={props.following} itemNum={props.itemNum} />
      </div>
    </div>
  )
}

export default Follower;

//
// {props.following?
//   <button  className="follow-button follow-btn-small unfollow-button" onClick={handlefollow} >unfollow </button>:<button className="follow-button follow-btn-small" onClick={handlefollow} > Follow </button>}
//   {/* CHANGE THIS BUTTON TO A SEPARATE ENTITY*/}
