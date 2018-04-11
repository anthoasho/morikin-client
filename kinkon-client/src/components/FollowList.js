/* Completely change this*/

import React, {Component} from 'react';
import Follow from "./Follow";
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
    this.props.getFollowList(this.props.url);
}
goBack(){
  this.props.history.goBack(); //At the moment this just sends the user back to the previous page - either don't use router or think of a better solution
}
    render(){
      let FollowerList
      if(!this.props.followUsers.length < 1){
      FollowerList = this.props.followUsers.map( (user, index) => (
      <Follow {...user} currentUser={this.props} itemNum={index} key={`${index}${user.username}`} />
    ))}else{
      FollowerList = "...Loading";
    }
    return(
      <div>
      <div className="popup-box follow-list">
        <h3>
          {this.props.url.split("/")[3].toUpperCase()} {/*Temporary*/}
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
