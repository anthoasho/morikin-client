import React from "react";
import Message from "./Message";
import { removeMessage, likeMessage } from "../../store/actions/messages";
import "./MessageList.css";
import {connect } from "react-redux";
import NewMessage from "./NewMessage";
const MessageList = props =>{
  const  {messages, removeMessage, currentUser, likeMessage, ui} = props;
  let MessageList;
  if(messages.loading ){
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
    return <div className={"item-box pag-change inactive"}> <h3> No More Content </h3> </div>
  }
  else{
    return <div className={"item-box page-change page-change-active"}  onClick={bottomClick}> <h1> + </h1> </div>
  }
}

function mapStateToProps(state){
  return {
    ui: state.ui,
    messages: state.messages,
    currentUser: state.currentUser.user.userId
    };
}
export default connect(mapStateToProps, {removeMessage, likeMessage})(MessageList);

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
