import React, {Component} from "react";
import MessageList from "../containers/MessageList";
import UserSmall from "../containers/UserSmall";
import {getUserProfile, followUser} from "../store/actions/userProfile";
import { fetchMessages } from "../store/actions/messages";
import FollowList from "./FollowList";
import {connect } from "react-redux";
import PopError from "../common/error";
class Timeline extends Component{
  constructor(props) {
    super(props);
    this.state = { isLoading:true};
    this.returnFetch = this.returnFetch.bind(this);
  }
  urlData = this.props.url;
  fetchUrl = this.urlData.params.id;
  returnFetch = () => {
    if(this.fetchUrl){
       //This is a temporary fix to prevent a 404 error between logging in and fetching content
       //It is caused by the fetch method relying on the url, which contains "signin"/"signup" briefly on logging in
       //TODO: Find a much better solution
      if((this.fetchUrl !== "signin") && (this.fetchUrl !== "signup")){
        this.props.fetchMessages(this.fetchUrl);
      }
    }else{
      this.props.fetchMessages();
    }
  }
  componentDidMount(){
    this.returnFetch();
    //Set an interval for automatically refreshing data, this will become a button or link in the future rather than self-refreshing
    this.refreshInterval = setInterval(()=> {
      this.returnFetch();
      }, 300000);
    if(this.fetchUrl){
      if((this.fetchUrl !== "signin") && (this.fetchUrl !== "signup")){
        this.props.getUserProfile(this.fetchUrl);
      }else if((this.fetchUrl === "signin") || (this.fetchUrl === "signup")){

        this.props.history.push("/")
      }
    }else{
      this.props.getUserProfile(this.props.user.username);
    }
  }
  componentWillUnmount(){
    clearInterval(this.refreshInterval);
  }
  render(){
    const { messages, profile, follow, currentUser, followUser, history, errors} = this.props;
    if(errors.message || errors.code){
      return(<PopError />)
    }
    if(messages.length < 1 || !profile.username){
      return (
        <div className="timeline-container">
          <UserSmall
            loading
            />
        <MessageList
            loading
            />
        </div>
      );
    }else{
      return(
        <div className="timeline-container">
          {follow &&
            <FollowList
              url={this.urlData.url}
              key={`${this.urlData.url}${profile.username}`}
              history={history}
            />
          }
          <UserSmall
            key={`user ${profile.username}`}
            profile={profile}
            followUser = {followUser}
            currentUser={currentUser.username}
          />
          <MessageList
            key={`messages ${this.urlData.url}`}
            messages ={messages}
            currentUser={currentUser.userId}
          />

          </div>
      );
      }
  }
}
function mapStateToProps(state){
  return {
    profile: state.userProfile.user,
    messages:state.messages,
    currentUser: state.currentUser.user,
    errors: state.errors
  };
}
export default connect(mapStateToProps, {getUserProfile, fetchMessages, followUser})(Timeline);
