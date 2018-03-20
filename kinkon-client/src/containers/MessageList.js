import React, {Component} from "react";
import Message from "./Message";
import "./MessageList.css";


class MessageList extends Component{

    render(){
        const messages = this.props.messages.map((m, index)=> ( !m.isDeleted ? <Message {...m} key={m._id} onDelete = {this.props.onDelete.bind(this, m.userId._id, m._id, index)} userLoggedIn = {this.props.user._id === m.userId._id} /> : null
        ));
    
    return(
            <div className="message-container"> 
                {messages}
            </div>
        );    
    }
    
}
export default MessageList;