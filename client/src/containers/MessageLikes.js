import React from "react";
import {connect} from "react-redux";
import {showLikesList} from "../store/actions/UI";
import Follow from "../containers/Follow";

const MessageLikes = props => {
  const goBack = () =>{
    // props.popUpHide()
  }
  let MessageLikes
  if(!props.likes.length < 1){
    //Similar to messages; maps over the the returned data and makes a list of followers with functioning following buttons (reason for currentUser)
  MessageLikes = props.likes.map( (user, index) => (
    <Follow {...user} currentUser={props}  itemNum={index} key={`${index}${user.username}`} />
  ))}else{
  MessageLikes = <h3>Uh-oh, there is nothing here yet! :(</h3>
  }
  return(
    <div className="likes-list">
    <div>
      <h3 style={{margin: "0", color: "white", float: "right"}}>
        Likes {/*Temporary*/}
      </h3>
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
