import React from "react";
import Message from "./Message";
import { removeMessage, likeMessage } from "../store/actions/messages";
import "./MessageList.css";
import {connect } from "react-redux";
const MessageList = props =>{
  const  {messages, removeMessage, currentUser, loading, likeMessage, bottomClick} = props;
  let MessageList;
  if(messages.loading || messages.data.length === 0){
      MessageList = <Message loading/>;
  }else{
    //Map through and generate the list of Messages
  MessageList = messages.data.map((m)=>
    (<Message {...m} key={m._id}
      removeMessage ={removeMessage.bind(this, m.userId._id, m._id)}
      likeMessage = {likeMessage.bind(this, m._id)}
      ownerCheck = {currentUser === m.userId._id}
      animate = {props.animate}
    />)
  );
  }
  return(
    <div className="message-container">
      {MessageList}

      <div className={"item-box page-change"}  onClick={bottomClick}> <h3> See more </h3> </div>
    </div>
  );
};

export default connect(null, {removeMessage, likeMessage})(MessageList);

/*-----------------------------------------------------------

THE FOLLOWING IS FOR POTENTIAL FUTURE FEATURES WHICH ARE DISABLED

------------------------------------------------------------*/

  // continueUpdate(){ // adds state to control endless scrolling
  //   this.setState({
  //     messageCount:{
  //     start: this.state.messageCount.start +20,
  //     end: this.state.messageCount.end +20
  //     }
  //   });
  //   this.props.fetchMessages(this.state.messageCount.start, this.state.messageCount.end);
  // }
  // isBottom(el) {
  //   return el.getBoundingClientRect().bottom <= window.innerHeight; // scrollling to bottom
  // }
  // document.addEventListener('scroll', this.trackScrolling);
  // trackScrolling = () => { //When document is scrolled to the bottom, updates state to get new data
  //   const wrappedElement = document.getElementById('body-container');
  //   if (this.isBottom(wrappedElement)) {
  //     this.continueUpdate();
  //   }
  // };
  // document.removeEventListener('scroll', this.trackScrolling);
