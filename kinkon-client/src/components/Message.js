import React from "react";
import {Link} from "react-router-dom";
import Moment from "react-moment";
import ProfileImg from "../common/ProfileImg";
import "./Message.css";
/*Temporary styling for colors for each user*/
function randomColor(){
  let red = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);
  return `rgb(${red}, ${blue}, ${green})`;
}
let color = randomColor();
const Message = ({text, userId, createdAt, ownerCheck, removeMessage, loading}) => {
 return loading ?
  <div className="ind-message" style={{borderRight: `4px solid ${color}`}}>
    <div className="meta-content">
    </div>
    <div className="message-content">
    </div>
  </div>
  :
  <div className="ind-message item-box" style={{borderRight: `4px solid ${userId.profileColor? userId.profileColor:randomColor()}`}}>
    <ProfileImg
      username={userId.username}
      profileImg= {userId.profileImgUrl}
      profileColor={userId.profileColor}
      loading={loading}

    />
    <div style={{width: "100%"}}>
      <div className="meta-content">
        <div style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
          <Link to={`/user/${userId.username}`}>{userId.displayName} <span style={{color:"gray", fontSize:"0.7rem", padding:"0 0 0 3px"}}> @{userId.username}  </span></Link>
          <div>
            <span className="time"><Moment format="YYYY/MM/DD">{createdAt}</Moment></span>
            <span className="time"> <Moment format="HH:mm">{createdAt}</Moment></span>
          </div>
        </div>
      </div>
      <div className="message-content">
          <p>{text}</p>
          {ownerCheck && (<button className="delete-btn" onClick={removeMessage} > X </button>)}
      </div>
    </div>
  </div>;
  };
export default Message;
