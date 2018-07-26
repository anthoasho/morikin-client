import React from 'react';
import SingleListItem from "./SingleListItem";
import {getFollowList} from "../store/actions/userProfile";
import "./ListUsers.css";
import {popUpHide, showLikesList} from "../store/actions/UI";
import {connect} from "react-redux";
import classNames from "classnames";
import PropTypes from "prop-types";

const ListUsers =  (props) => {
  //Type decides if the List renders for likes under messages, or followers/following under userprofile
  const {type} = props;
  const goBack = () =>{
    if(type === "likes"){
      props.showLikesList(null, "likes");
    }else if(type ==="follow"){
      props.popUpHide("follow");
    }
  }
  let tester = {
    likes: {
      list: props.context && props.state[props.context].messages.likes
    },
    follow: {
      list: props.follow
    }
  }
    let List

    if(tester[type].list && (!tester[type].list.length < 1)){
      //Similar to messages; maps over the the returned data and makes a list of followers with functioning following buttons (reason for currentUser)
    List = tester[type].list.map( (user, index) => (
      <SingleListItem {...user} currentUser={props} followType={`${type}List`} className={classNames({[`${type}-list-box`]:true, "list-box":true, "list-exit":props.ui[type].animateOut})}  itemNum={index} key={`${index}${user.username}`} />
    ))}else{
    List = <h3 className="likes-title">Uh-oh, there is nothing here yet! :(</h3>
    }
    return(
      <div className={type === "follow" ? "follow-list-container" : "likes-area"}>
        <div  onClick={goBack} className="back-button back-button-reverse"> <div className="back-icon back-icon-reverse"></div>  <h3 className="likes-title">
          {props.ui[type].title}

        </h3> </div>
        <div className={classNames({[`${type}-list`]:true,  "list-enter": true, "list-exit":props.ui[type].animateOut })}>
        {List}
      </div>
        <div onClick={goBack} className=""> </div>
      </div>
    )
}
ListUsers.propTypes = {
  type: PropTypes.string,
  popUpHide: PropTypes.func,
  follow: PropTypes.array,
  ui: PropTypes.object,
  likes: PropTypes.array
}
function mapStateToProps(state){
  return {
    follow: state.follow,
    current: state.myProfile.auth.username,
    ui: state.ui,
    context: state.ui.context,
    // likes: state.messages.likes,
    state: state
  };
}

export default connect(mapStateToProps, {getFollowList, popUpHide, showLikesList})(ListUsers);
