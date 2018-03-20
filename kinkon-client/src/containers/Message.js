/*NEED TO: 
    Delete (authenticated && authorized)
*/

import React, { Component } from "react";
import {Link} from "react-router-dom";
import "./Message.css";
/*Temporary styling for colors for each user*/
function randomColor(){
  let red = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);
  return `rgb(${red}, ${blue}, ${green})`;
}
class Message extends Component{
  render(){
    const boxColor = randomColor();
    const {text, userId, createdAt, onDelete, userLoggedIn} = this.props;
    const userUrl = `/user/${userId._id}`
    return(
        <div className="ind-message" style={{borderRight: `4px solid ${boxColor}`}}>
          <div className="meta-content">
            <img alt={`${userId.username}'s profile `} src={userId.profileImgUrl} style={{border: `2px solid ${boxColor}`}} />
          </div>
          <div className="message-content">
          <Link to={userUrl}>{userId.username}</Link>
          <span> {createdAt} </span>
            <p>{text}</p>
            
            {userLoggedIn ? <button onClick={onDelete} > Delete </button> : null}
          </div>
        </div>
      );
  }
}
export default Message;