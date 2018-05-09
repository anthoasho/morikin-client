import React, {Component} from "react";
import MessageList from "../containers/MessageList";
import UserSmall from "../containers/UserSmall";
import {getUserProfile, followUser, getDiscoverUsers} from "../store/actions/userProfile";
import { fetchMessages, updateMessages } from "../store/actions/messages";
import {connect } from "react-redux";
import PopError from "../common/error";
import Discover from "../containers/Discover";


class Timeline extends Component{
  constructor(props) {
    super(props);
    this.returnFetch = this.returnFetch.bind(this);
    this.handleBottom = this.handleBottom.bind(this);
  }
  urlData = this.props.url;
  fetchUrl = this.urlData.params.id;
  returnFetch = (page) => {
    if(this.fetchUrl){
       //This is a temporary fix to prevent a 404 error between logging in and fetching content
       //It is caused by the fetch method relying on the url, which contains "signin"/"signup" briefly on logging in
       //TODO: Find a much better solution
      if((this.fetchUrl !== "signin") && (this.fetchUrl !== "signup")){
        this.props.fetchMessages(this.fetchUrl);
      }
    }else{
      this.props.fetchMessages("", "");
    }
  }
  handleBottom = () => {
    let method = this.fetchUrl ? this.fetchUrl : ""
    let lastMessage = this.props.messages.data[this.props.messages.data.length -1]
    this.props.updateMessages(method, lastMessage._id);
  }
  componentDidMount(){
    this.props.getDiscoverUsers();
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
    const { messages, profile,  currentUser, followUser, errors, discover} = this.props;
    if(errors.message || errors.code){
      return(<PopError />)
    }
      return(
        <div className="timeline-container">

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
            bottomClick={this.handleBottom}
          />
          <Discover users={discover.users}/>
          </div>
      );
      // }
  }
}
function mapStateToProps(state){
  return {
    profile: state.userProfile,
    messages:state.messages,
    currentUser: state.currentUser.user,
    errors: state.errors,
    discover: state.discover
  };
}
export default connect(mapStateToProps, {getUserProfile, fetchMessages, followUser, updateMessages, getDiscoverUsers})(Timeline);
