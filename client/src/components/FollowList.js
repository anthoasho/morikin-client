import React, {Component} from 'react';
import Follow from "../containers/Follow";
import {getFollowList} from "../store/actions/userProfile";
import "./FollowList.css";
import {connect } from "react-redux";

class FollowersList extends Component {
  constructor(props) {
  super(props);
  this.state = { isLoading:true};
  this.goBack = this.goBack.bind(this);
  }
  componentDidMount(){
      this.props.getFollowList(`/user/${this.props.url}`);
  }
  goBack(){
    //At the moment this just sends the user back to the previous page - think of a better solution site-wide
    this.props.history.goBack();
  }
  render(){
    let FollowerList
    if(!this.props.followUsers.length < 1){
      //Similar to messages; maps over the the returned data and makes a list of followers with functioning following buttons (reason for currentUser)
    FollowerList = this.props.followUsers.map( (user, index) => (
      <Follow {...user} currentUser={this.props}  itemNum={index} key={`${index}${user.username}`} />
    ))}else{
    FollowerList = "...Loading";
    }
    return(
      <div>
      <div className="popup-box follow-list">
        <h3>
          {this.props.url.split("/")[2].toUpperCase()} {/*Temporary*/}
        </h3>
        {FollowerList}
      </div>
        <div onClick={this.goBack} className="fullscreen"> </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    followUsers: state.follow,
    current: state.currentUser.user.username
  };
}

export default connect(mapStateToProps, {getFollowList})(FollowersList);
