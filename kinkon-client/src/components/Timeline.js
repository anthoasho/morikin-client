import React, {Component} from "react"; 
import MessageList from "../containers/MessageList";
import UserSmall from "./UserSmall";
import {getUserProfile} from "../store/actions/userProfile";
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
  }
  componentDidMount(){
    setTimeout( () =>{
    this.setState({
      isLoading: false
    });
 
    }, 2000);
        this.props.fetchMessages(this.urlData.url);
    if(this.props.url.params.id){
      this.props.getUserProfile(this.urlData.params.id);
    }else{
      this.props.getUserProfile(this.props.user.userId);
    }
  }
  componentWillUnmount(){
   this.setState({
      isLoading: true
    });
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
          currentUser={this.props.currentUser}
          url={this.urlData.url}
          />
      </div> 
      :
      <div className="timeline-container"> 
        <UserSmall 
          username={this.props.profile.username}
          profileImg={this.props.profile.profileImgUrl}
        /> 
        
         <MessageList 
          key={this.props.url.url}
          user={this.props.user} 
          messages ={this.props.messages}
          currentUser={this.props.currentUser}
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
    currentUser: state.currentUser.user.userId,
    errors: state.errors
  };
}
export default connect(mapStateToProps, {getUserProfile, fetchMessages})(Timeline);