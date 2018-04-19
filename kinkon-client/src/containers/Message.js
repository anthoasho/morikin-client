import React from "react";
import {Link} from "react-router-dom";
import Moment from "react-moment";
import ProfileImg from "../common/ProfileImg";
import classNames from "classnames";
import {DeleteButton} from "../common/Button";
import "./Message.css";
/*Temporary styling for colors for each user*/
function randomColor(){
  let red = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);
  return `rgb(${red}, ${blue}, ${green})`;
}
let color = randomColor();
const Message = ({text, userId, createdAt, ownerCheck, removeMessage, loading, likedBy, likeMessage, isLiked, isDeleted}) => {
 return loading ?
  <div className={classNames({"ind-message": true, "ind-message-on-delete": isDeleted})} style={{borderRight: `4px solid ${color}`}}>
    <div className="meta-content">
    </div>
    <div className="message-content">
    </div>
  </div>
  :
  <div className={classNames({"ind-message": true, "item-box": true, "ind-message-on-delete": isDeleted})} style={{borderRight: `4px solid ${userId.profileColor? userId.profileColor:randomColor()}`}}>
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
      <span className="message-likes"> <div onClick={likeMessage} className={classNames({"like-button": true, "like-button-true": isLiked})} >    </div> {likedBy} likes </span>
  </div>;
  };
export default Message;
