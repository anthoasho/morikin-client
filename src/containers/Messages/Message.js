import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import Moment from "react-moment";
import ProfileImg from "../../common/ProfileImg";
import {LikeButton} from "../../common/logo";
import classNames from "classnames";
import {DeleteButton} from "../../common/Button";
import Dropdown, {DropdownItem} from "./Dropdown";
import {connect} from "react-redux";
import {showLikesList} from "../../store/actions/UI";
import ListUsers from "../../common/ListUsers";
import "./Message.css";
/*Temporary styling for colors for each user*/
function randomColor(){
  let red = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);
  return `rgb(${red}, ${blue}, ${green})`;
}
let color = randomColor();
const Message = ({text, userId, createdAt, ownerCheck, removeMessage, loading, likedBy, likeMessage, isLiked, isDeleted, _id,  showLikesList, ui, context, isLoggedIn}) => {
  function handleLikesShow(id){
    let obj = {
      method: "list",
      title: "Message likes",
      url: `messages/${id}/likes`
    }
    if(ui.display === true && likeId ===_id){
      showLikesList(null, "likes");
    }else{
      showLikesList(obj)
    }
  }
  let likeId

  if(ui.url){
    likeId = ui.url.split("/")[1]
  }

  function showLikes(){
  if(likeId === _id){
    return  <ListUsers type={"likes"} context={context} />
  }
}

 return loading ?
  <div className={classNames({"ind-message": true,"item-box": true, "ind-message-on-delete": isDeleted})} style={{borderRight: `4px solid ${color}`}}>
    <ProfileImg
      loading={loading}
    />
    <div className="message-loading-text">
    Loading
    </div>
  </div>
  :
  <div className={classNames({"message-wrapper": true,  "ind-message-on-delete": false})}>
  <div className={classNames({"ind-message": true, "item-box": true, "ind-message-on-delete": isDeleted})} >
    <ProfileImg
      username={userId.username}
      profileImg= {userId.profileImgUrl}
      profileColor={userId.profileColor}
      loading={loading}
    />
    <div className="message-username">
          <Link to={`/u/${userId.username}`}>{userId.displayName} <span  style={{color:"gray", fontSize:"0.7rem", padding:"0 0 0 3px"}}> @{userId.username}  </span></Link>
    </div>
    <div className="time">
            <span ><Moment format="YYYY/MM/DD">{createdAt}</Moment></span>
            <span > <Moment format="HH:mm">{createdAt}</Moment></span>
    </div>
    {isLoggedIn &&<Dropdown>
        {(ownerCheck && <DropdownItem> <DeleteButton type="delete" onClick={removeMessage} /></DropdownItem>)}
        <DropdownItem onClick={likeMessage}> <p> Like</p>  </DropdownItem>
      </Dropdown>
    }
          <p className="message-text">{text}</p>
          {/* This handles liking
           if the user has already liked it (as returned from the API in a truthy) it will show a red heart
           otherwise it is clear
           isLiked is passed through props using classNames.
           likedBy refers to the number of likes the post has recieved
           this is returned from the API as a number only (array.length())
           */}
      <div className="message-likes">
        {isLoggedIn &&<div onClick={likeMessage} className={classNames({"like-button": true, "like-button-true": isLiked})} ><LikeButton /></div>}
        <button onClick={() =>  handleLikesShow(_id)}><span> {likedBy} likes</span> </button>
      </div>
      <div className="color-message-border"
        style={{background: `${userId.profileColor? userId.profileColor:randomColor()} `}}>

        </div>
  </div>
  {ui.display && showLikes()}
  </div>;
};
Message.propTypes ={
text: PropTypes.string,
userId: PropTypes.object,
createdAt:PropTypes.string,
ownerCheck:PropTypes.bool,
removeMessage: PropTypes.func,
loading: PropTypes.bool,
likedBy: PropTypes.number,
likeMessage:PropTypes.func,
isLiked: PropTypes.bool,
isDeleted:PropTypes.bool,
_id:PropTypes.string,
showLikesList:PropTypes.func,
ui:PropTypes.object
}




  function mapStateToProps(state){
    return {
      ui: state.ui.likes
    };
  }
export default connect(mapStateToProps, {showLikesList})(Message);
