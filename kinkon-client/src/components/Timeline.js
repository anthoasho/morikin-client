import React, {Component} from "react";
import MessageList from "../containers/MessageList";
import UserSmall from "./UserSmall";
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
  returnFetch = () => {
    if(this.urlData.params.id){
      this.props.fetchMessages(this.urlData.params.id);
    }else{
      this.props.fetchMessages();
    }
  }
  componentDidMount(){
    this.returnFetch();
    this.refreshInterval = setInterval(()=> {
      this.returnFetch();
      }, 300000); //Unsure if this is the method I want for refreshing data
    if(this.props.url.params.id){
      this.props.getUserProfile(this.urlData.params.id);
    }else{
      this.props.getUserProfile(this.props.user.username);
    }
  }
  componentWillUnmount(){
    clearInterval(this.refreshInterval);
    //figure out a way to trigger loading upon unmounting component
  }
  render(){

    const {message, messages, user, username, profile, follow, currentUser, followUser, url, history, errors} = this.props;
    if(errors.message || errors.code){
      return(<PopError />)
    }
    if(message < 1 || !profile.username){
    return (
      <div className="timeline-container">
        <UserSmall
          loading
          />
      <MessageList
          loading
          />
      </div> );
      }else{
        return(
      <div className="timeline-container">
      {follow &&
        <FollowList
            url={this.urlData.url}
            key={`${this.urlData.url}${username}`}
            history={history}
        />
      }

        <UserSmall
          key={`user ${username}`}
          profile={profile}
          followUser = {followUser}
          currentUser={currentUser.username}
        />
        

         <MessageList
          key={`messages ${url.url}`}
          user={user}
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
