import React, {Component} from "react";
import MessageList from "../Messages/MessageList";
import UserSmall from "../LeftSideBar/UserSmall";
import {getUserProfile, followUser, getDiscoverUsers} from "../../store/actions/userProfile";
import { updateMessages } from "../../store/actions/messages";
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
    this.state ={
      location: this.paramsID ? "profile" : "dashboard"
    }
    this.getUserProfile = this.props.getUserProfile.bind(this, this.state.location)
    this.handleBottom = this.handleBottom.bind(this);
  }
  urlData = this.props.match;
  paramsID = this.urlData.params.id;
  handleBottom = () => {
    let method = this.paramsID ? this.paramsID : ""
    let lastMessage = this.props.messages.data[this.props.messages.data.length -1]
    this.props.updateMessages(method, lastMessage._id);
  }
  componentWillMount(){
    window.addEventListener("resize", () => (this.props.resizeFunction(window.innerWidth)))
  }
  componentDidMount(){
    if(this.paramsID){
      this.getUserProfile(this.paramsID);
    }else{
      this.getUserProfile();
    }
    this.props.getDiscoverUsers();
    this.props.clearAllPopUps()
  }
  componentWillUnmount(){
    window.removeEventListener("resize", this.handleResize)
    // clearInterval(this.refreshInterval);
  }
  render(){
    const { errors, discover, profile, loadingBool} = this.props;
    const {url} = this.urlData
    if(errors.message || errors.code){
      return(<PopError />)
    }
    if((this.props.isMobile) && (url === "/")){
      return     (<div className="timeline-container">
            {loadingBool && <Loading /> }
              <MessageList
                key={`messages ${url}`}
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
            key={`messages ${url}`}
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
export default withRouter(connect(mapStateToProps, {getUserProfile, followUser, updateMessages, getDiscoverUsers, clearAllPopUps, resizeFunction})(Timeline));


//Currently disabled refreshInterval, aim to replace with socket io (pushdata)
              // this.refreshInterval = setInterval(()=> {
              //   this.returnFetch();
              // }, 300000);
