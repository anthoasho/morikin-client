import React from 'react';
import Follow from "../containers/Follow";
import {getFollowList} from "../store/actions/userProfile";
import {popUpHide} from "../store/actions/UI";
import "./FollowList.css";
import {connect} from "react-redux";

const FollowersList =  (props) => {
  const goBack = () =>{
    //At the moment this just sends the user back to the previous page - think of a better solution site-wide
    // props.history.goBack();
    props.popUpHide()
  }

    let FollowerList
    if(!props.followUsers.length < 1){
      //Similar to messages; maps over the the returned data and makes a list of followers with functioning following buttons (reason for currentUser)
    FollowerList = props.followUsers.map( (user, index) => (
      <Follow {...user} currentUser={props} followType={"followList"}  itemNum={index} key={`${index}${user.username}`} />
    ))}else{
    FollowerList = <h3>Uh-oh, there is nothing here yet! :(</h3>
    }
    return(
      <div className="follow-list">
      <div>
        <h3>
          {props.ui.title} {/*Temporary*/}
        </h3>
        {FollowerList}
      </div>
        <div onClick={goBack} className=""> </div>
      </div>
    )
}

function mapStateToProps(state){
  return {
    followUsers: state.follow,
    current: state.currentUser.user.username,
    ui: state.ui.follow
  };
}

export default connect(mapStateToProps, {getFollowList, popUpHide})(FollowersList);
