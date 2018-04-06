import React from "react";
import {Link} from "react-router-dom";
import Moment from "react-moment";
import PreloaderIcon, {ICON_TYPE} from 'react-preloader-icon';
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
  const addDefaultSrc = (e) => {
    e.target.src =require("./test-profile-picture.jpeg")
  }
 return loading ?
  <div className="ind-message" style={{borderRight: `4px solid ${color}`}}>
    <div className="meta-content">
      <PreloaderIcon
        className="loading-icon"
        type={ICON_TYPE.TAIL_SPIN}
        size={40}
        strokeWidth={4}
        strokeColor="#ae27e8"
        duration={800}
      />
    </div>
    <div className="message-content">
    </div>
  </div>
  :
  <div className="ind-message" style={{borderRight: `4px solid ${randomColor()}`}}>
    <div className="img-content">
      <img onError={addDefaultSrc} alt={`${userId.username}'s profile `} src={userId.profileImgUrl} style={{border: `2px solid ${randomColor()}`}} />
    </div>
    <div style={{width: "100%"}}>
      <div className="meta-content">
        <div style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
          <Link to={`/user/${userId.username}`}>{userId.username}</Link>
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
