import React, {Component} from "react"; 
import MessageList from "../containers/MessageList";
import UserSmall from "./UserSmall";
import {getUserProfile, followUser} from "../store/actions/userProfile";
import { fetchMessages } from "../store/actions/messages";

import {connect } from "react-redux";

class Timeline extends Component{
    constructor(props) {
    super(props);
    this.state = { isLoading:true};
  }
    urlData = this.props.url;
  componentWillMount(){
       this.setState({
      isLoading: true
    });
    console.log(this.props)
  }
  componentDidMount(){
    setTimeout( () =>{ //simulate apiCall - PURELY TEST ONLY 
    this.setState({
      isLoading: false
    });}, 2000);
    this.props.fetchMessages(this.urlData.url);
    this.refreshInterval = setInterval(()=> {
      this.props.fetchMessages(this.urlData.url); 
      }, 1200000); //Unsure if this is the method I want for refreshing data
    if(this.props.url.params.id){
      this.props.getUserProfile(this.urlData.params.id);
    }else{
      this.props.getUserProfile(this.props.user.username);
    }
  }
  componentWillUnmount(){
   this.setState({
      isLoading: true
    });
    clearInterval(this.refreshInterval);
  }
  render(){
    return (
      this.state.isLoading ? 
      <div className="timeline-container">
        <UserSmall 
          username="loading"

          /> 
      <MessageList 
          key={this.props.url.url}
          user={this.props.user} 
          messages ={this.props.messages}
          currentUser={this.props.currentUser.userId}
          url={this.urlData.url}
          />
      </div> 
      :
      <div className="timeline-container"> 
        <UserSmall 
          username={this.props.profile.username}
          profileImg={this.props.profile.profileImgUrl}
          following = {this.props.profile.following}
          followUser = {this.props.followUser}
          currentUser={this.props.currentUser.username}
        /> 
        
         <MessageList 
          key={this.props.url.url}
          user={this.props.user} 
          messages ={this.props.messages}
          currentUser={this.props.currentUser.userId}
          url={this.urlData.url}
          /> 
        </div>
      
  );
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