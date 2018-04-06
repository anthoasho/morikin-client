import React, {Component} from "react";
import MessageList from "../containers/MessageList";
import UserSmall from "./UserSmall";
import {getUserProfile, followUser} from "../store/actions/userProfile";
import { fetchMessages } from "../store/actions/messages";
import FollowList from "./FollowList";
import {connect } from "react-redux";

class Timeline extends Component{
    constructor(props) {
    super(props);
    this.state = { isLoading:true};
  }
    urlData = this.props.url;
  componentDidMount(){


    const returnFetch = () => {
      if(this.urlData.params.id){
        this.props.fetchMessages(this.urlData.params.id);
      }else{
        this.props.fetchMessages();
      }
    }

    returnFetch();
    this.refreshInterval = setInterval(()=> {
      returnFetch();
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
    if(this.props.message < 1 || !this.props.profile.username){
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
      {this.props.follow &&
        <FollowList
                url={this.urlData.url}
                key={`${this.urlData.url}${this.props.username}`}
                history={this.props.history}
        />
      }

        <div className="timeline-left">
        <UserSmall
          key={`user ${this.props.username}`}
          username={this.props.profile.username}
          profileImg={this.props.profile.profileImgUrl}
          following = {this.props.profile.following}
          profile={this.props.profile}
          followUser = {this.props.followUser}
          currentUser={this.props.currentUser.userId}
        />
        </div>
        <div className="timeline-right">
         <MessageList
          key={`messages ${this.props.url.url}`}
          user={this.props.user}
          messages ={this.props.messages}
          currentUser={this.props.currentUser.userId}
          />
          </div>
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
