import React from "react";
import PropTypes from "prop-types";
import Message from "./Message";
import { removeMessage, likeMessage } from "../../store/actions/messages";
import "./MessageList.css";
import {connect } from "react-redux";
import NewMessage from "./NewMessage";
const MessageList = props =>{
  const  {messages, removeMessage, currentUser, likeMessage, ui} = props;
  let MessageList;
  MessageList = messages.data.map((m)=>
    (<Message {...m} key={m._id}
      removeMessage ={removeMessage.bind(this, m.userId._id, m._id)}
      likeMessage = {likeMessage.bind(null, m._id)}
      ownerCheck = {currentUser === m.userId._id}
      animate = {props.animate}

    />)
  );
  // }
  return(
    <div className="message-container">
    {ui.newMessage.display &&
      <NewMessage />}
      {MessageList}
      {loadMoreContent(props)}
    </div>
  );
};


const loadMoreContent = props =>{
  const {messages, bottomClick} = props;
  if(messages.loading){
    return  <div className={"item-box page-change"}> <h3> Loading </h3> </div>
  }else if(messages.isLast || messages.data.length < 1){
    return <div className={"item-box page-change inactive"}> <h3> Nothing to show! </h3> </div>
  }
  else{
    return <div className={"item-box page-change page-change-active"}  onClick={bottomClick}><h1>  + </h1> </div>
  }
}

MessageList.propTypes = {
  messages: PropTypes.object,
  removeMessage: PropTypes.func,
  currentUser: PropTypes.string,
  likeMessage: PropTypes.func,
  ui: PropTypes.object,
}

function mapStateToProps(state){
  return {
    ui: state.ui,
    currentUser: state.myProfile.auth.userId

    };
}
export default connect(mapStateToProps, {removeMessage, likeMessage})(MessageList);
