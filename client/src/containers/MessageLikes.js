import React from "react";
import {connect} from "react-redux";
import {showLikesList} from "../store/actions/UI";
import Follow from "../containers/Follow";

const MessageLikes = props => {
  const goBack = () =>{
    props.showLikesList(null, true)
  }
  let MessageLikes
  if(!props.likes.length < 1){
    //Similar to messages; maps over the the returned data and makes a list of followers with functioning following buttons (reason for currentUser)
  MessageLikes = props.likes.map( (user, index) => (
    <Follow {...user} className={"likes-list-box "} currentUser={props} followType="likesList"  itemNum={index} key={`${index}${user.username}`} />
  ))}else{
  MessageLikes = <h3 className="likes-title">Nobody has liked this message! :(</h3>
  }
  return(
    <div className="likes-area">
      <div  onClick={goBack} className="back-button"> <div className="back-icon"></div>  <h3 className="likes-title">
          Likes {/*Temporary*/}
        </h3> </div>

      <div className="likes-list">
      {MessageLikes}
    </div>
      <div onClick={goBack} className=""> </div>
    </div>
  )
}

function mapStateToProps(state){
  return {
    likes: state.messages.likes,
    current: state.currentUser.user.username,
    ui: state.ui.popUp
  };
}


export default connect(mapStateToProps, {showLikesList})(MessageLikes);
