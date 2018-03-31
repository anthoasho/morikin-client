import React from "react";
import Message from "../components/Message";
import { removeMessage } from "../store/actions/messages";
import "./MessageList.css";
import {connect } from "react-redux";
const MessageList = props =>{
  const  {messages, removeMessage, currentUser, loading} = props;
  let MessageList;
  if(loading){
      MessageList = <Message loading/>;
  }else{
  MessageList = messages.map((m)=> 
    (<Message {...m} key={m._id} 
      removeMessage ={removeMessage.bind(this, m.userId._id, m._id)}
      ownerCheck = {currentUser === m.userId._id} 
    />)
  );
  }
  return(
    <div className="message-container"> 
      {MessageList}
    </div>
  );    
};

export default connect(null, {removeMessage})(MessageList);

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
