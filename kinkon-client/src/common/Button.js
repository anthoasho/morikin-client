import React from "react";
import "./Button.css";
import classNames from "classnames";

export const Button = (props) => {
  let {type, onClick, text, loading} = props;
  switch(type){
 case "submit":
   return <button className={classNames({"submit-button": true, "button-loading":loading})} onClick={onClick} >{text}</button>
 case "signin":
  return <button className="sign-in-btn" onClick={onClick} >{text}</button>
  case "signup":
   return <button className="sign-up-btn" onClick={onClick} >{text}</button>
 // case "profileEdit":
 //   return   <Link to={`/editprofile`} style={{width: "80%", margin: "auto"}}><button  className={`follow-button unfollow-button ${props.extraClass && props.extraClass}`} style={{width: "100%"}} onClick={handleProfileOptions} >Edit Profile</button></Link>
 default:
 return  <button  className={`submit-button`} style={{background: "gray"}}>loading...</button>
}
}
