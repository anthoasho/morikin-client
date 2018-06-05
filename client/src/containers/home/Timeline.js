import React, {Component} from "react";
import MessageList from "../Messages/MessageList";
import UserSmall from "../LeftSideBar/UserSmall";
import {getUserProfile, followUser, getDiscoverUsers} from "../../store/actions/userProfile";
import { fetchMessages, updateMessages } from "../../store/actions/messages";
import {clearAllPopUps, resizeFunction} from "../../store/actions/UI";
import PreloaderIcon, {ICON_TYPE} from 'react-preloader-icon';
import { withRouter} from "react-router-dom";
import {connect } from "react-redux";
import PopError from "../../common/error";
import Discover from "../RightSideBar/Discover";
import PropTypes from "prop-types";

class Timeline extends Component{
  constructor(props) {
    super(props);
    this.returnFetch = this.returnFetch.bind(this);
    this.handleBottom = this.handleBottom.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }
  urlData = this.props.match;
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
  componentWillMount(){
    window.addEventListener("resize", this.handleResize)
  }
  handleResize(){
    this.props.resizeFunction(window.innerWidth)
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
      this.props.getUserProfile(this.props.currentUser.username);
    }
    this.props.clearAllPopUps()
  }
  componentWillUnmount(){
    window.removeEventListener("resize", this.handleResize)
    clearInterval(this.refreshInterval);
  }
  render(){
    const { errors, discover, profile, loadingBool} = this.props;
    if(errors.message || errors.code){
      return(<PopError />)
    }
    if((this.props.isMobile) && (this.urlData.url === "/")){
      return     (<div className="timeline-container">
            {loadingBool && <Loading /> }
            <MessageList
              key={`messages ${this.urlData.url}`}
              bottomClick={this.handleBottom}
            />
            </div>)
    }


      return(
        <div className="timeline-container">
          {loadingBool && <Loading /> }
          <UserSmall
            key={`user ${profile.username}`}
          />
          <MessageList
            key={`messages ${this.urlData.url}`}
            bottomClick={this.handleBottom}
          />

          {!this.props.isMobile &&<Discover users={discover.users}/>}
          </div>
      );
  }
}
Timeline.propTypes = {
  profile: PropTypes.object,
  messages: PropTypes.object,
  currentUser: PropTypes.object,
  errors: PropTypes.object,
  discover: PropTypes.object,
  loadingBool: PropTypes.bool,
  isMobile: PropTypes.bool,
  getUserProfile: PropTypes.func,
  fetchMessages: PropTypes.func,
  followUser: PropTypes.func,
  updateMessages: PropTypes.func,
  clearAllPopUps: PropTypes.func,
  resizeFunction: PropTypes.func
}


const Loading = () => {
  return(
    <div className="loading">
      <PreloaderIcon
        className="profile-picture"
        type={ICON_TYPE.TAIL_SPIN}
        size={50}
        strokeWidth={4}
        strokeColor="#ae27e8"
        duration={800}
      />
    </div>
  )
}

function mapStateToProps(state){
  return {
    profile: state.userProfile,
    messages:state.messages,
    currentUser: state.currentUser.user,
    errors: state.errors,
    discover: state.discover,
    loadingBool: state.ui.loading,
    isMobile: state.ui.isMobile
  };
}
export default withRouter(connect(mapStateToProps, {getUserProfile, fetchMessages, followUser, updateMessages, getDiscoverUsers, clearAllPopUps, resizeFunction})(Timeline));
