import React, {Component} from "react";
import MessageList from "./MessageList";
import * as Help from "../utils/MainAppFunctions";
import {Route, Switch} from "react-router-dom"; 
import NewMessage from"../utils/NewMessage";
import UserSmall from "../UserSmall";
import "./UserProfile.css"
class Dashboard extends Component{
 constructor(props){
    super(props);
    this.state = {
        messages: [],
        user: {
          _Id: null,
          username: "Loading",
          profileImgUrl: "https://4vector.com/i/free-vector-rubik-s-cube-random-clip-art_106251_Rubiks_Cube_Random_clip_art_medium.png"
        },
        messageCount: {
         start: 0,
         end: 20
        }
      };
      this.getAllMessages = Help.getAllMessages.bind(this);
      this.newPost = Help.newPost.bind(this);
      this.continueUpdate = Help.continueUpdate.bind(this);
      this.softDelete = Help.softDelete.bind(this);
  }
  isBottom(el) {
  return el.getBoundingClientRect().bottom <= window.innerHeight; // scrollling to bottom
}
componentDidMount(){
 document.addEventListener('scroll', this.trackScrolling);
     this.getAllMessages(this.state.messageCount.start, this.state.messageCount.end);
}
trackScrolling = () => { //When document is scrolled to the bottom, updates state to get new data 
  const wrappedElement = document.getElementById('body-container');
  if (this.isBottom(wrappedElement)) {
    this.continueUpdate();
  }
};

  componentWillUnmount(){
   document.removeEventListener('scroll', this.trackScrolling);
  }
  componentWillMount(){


   
   }
  
  render(){
      const { messages } = this.state;
      const {userLoggedIn} = this.props;
    return(
       <div className="user-profile-page">
        <UserSmall user={userLoggedIn} />
        <MessageList messages = {messages} user={userLoggedIn} onDelete={this.softDelete}/>
             <Switch>
            <Route path="/new">
               <NewMessage 
             newPost = {this.newPost}
             user = {userLoggedIn}
           />
           
         </Route>
       </Switch>
       </div>
      );
  }
}

export default Dashboard;
