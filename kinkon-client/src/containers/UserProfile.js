import React, {Component} from "react";
import MessageList from "./MessageList";
import * as Help from "../utils/MainAppFunctions";
import {Route, Switch} from "react-router-dom"; 
import NewMessage from"../utils/NewMessage";
import UserSmall from "../UserSmall";
import "./UserProfile.css";
const svgLoading = require("./Rolling-1s-200px.svg");
class UserProfile extends Component{
  constructor(props){
    super(props);
    this.state = {
        messages: [],
        user: {
          _Id: null,
          username: "Loading",
          profileImgUrl: svgLoading
        }
      };
      this.getUserMessages = Help.getUserMessages.bind(this);
      this.newPost = Help.newPost.bind(this);
      this.softDelete = Help.softDelete.bind(this);
  }
  componentWillMount(){
   this.getUserMessages(this.props.match.params.id);
   }
  render(){
      const { messages, user } = this.state;
      const {newPost, userLoggedIn } = this.props;

    return(
       <div className="user-profile-page">
        <UserSmall user={user} />
        <MessageList messages = {messages} user = {userLoggedIn}  onDelete={this.softDelete}/>
          <Switch>
             <Route path="/new">
                <NewMessage 
                  newPost = {newPost}
                  user = {userLoggedIn}
                />
            </Route>
          </Switch>
       </div>
      );
  }
}

export default UserProfile;
