import React from "react";
import {Link} from "react-router-dom";
import Moment from "react-moment";
import ProfileImg from "../common/ProfileImg";
import classNames from "classnames";
import {DeleteButton} from "../common/Button";
import {connect } from "react-redux";
import {getFollowList} from "../store/actions/userProfile";
import "./Message.css";
/*Temporary styling for colors for each user*/
function randomColor(){
  let red = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);
  return `rgb(${red}, ${blue}, ${green})`;
}
let color = randomColor();
const Message = ({text, userId, createdAt, ownerCheck, removeMessage, loading, likedBy, likeMessage, isLiked, isDeleted, animate, animateUp, getFollowList, _id}) => {
  //If it is currently loading empty divs are generated, this should be better handled in the future

 return loading ?
  <div className={classNames({"ind-message": true,"item-box": true, "ind-message-on-delete": isDeleted})} style={{borderRight: `4px solid ${color}`}}>
    <ProfileImg
      loading={loading}
    />
    <div className="message-loading-text">
    Loading
    </div>
  </div>
  :
  <div className={classNames({"ind-message": true, "item-box": true, "ind-message-on-delete": isDeleted})} >
    <ProfileImg
      username={userId.username}
      profileImg= {userId.profileImgUrl}
      profileColor={userId.profileColor}
      loading={loading}
    />
    <div className="message-username">
          <Link to={`/${userId.username}`}>{userId.displayName} <span  style={{color:"gray", fontSize:"0.7rem", padding:"0 0 0 3px"}}> @{userId.username}  </span></Link>
    </div>
    <div className="time">
            <span ><Moment format="YYYY/MM/DD">{createdAt}</Moment></span>
            <span > <Moment format="HH:mm">{createdAt}</Moment></span>
    </div>
          <p className="message-text">{text}</p>
          {ownerCheck && (<DeleteButton type="delete" onClick={removeMessage} />)}
          {/* This handles liking
           if the user has already liked it (as returned from the API in a truthy) it will show a red heart
           otherwise it is clear
           isLiked is passed through props using classNames.
           likedBy refers to the number of likes the post has recieved
           this is returned from the API as a number only (array.length())
           */}
      <div className="message-likes"> <div onClick={likeMessage} className={classNames({"like-button": true, "like-button-true": isLiked})} >    </div><Link to={`/message/${_id}/likes`} ><span> {likedBy} likes</span> </Link> </div>
      <div className="color-message-border"
        style={{background: `${userId.profileColor? userId.profileColor:randomColor()} `}}>

        </div>
  </div>;
  };
export default connect(null, {getFollowList})(Message);
