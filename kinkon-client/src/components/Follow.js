import React from 'react';
import "./Message.css";
import {Link} from "react-router-dom";
import {followUser} from "../store/actions/userProfile";
import {connect } from "react-redux";
const Follower = (props) => {
  return(
    <div className="follow-list-individual">
    <div className="follow-left">
      <div className="img-content follow-list-img">
        <img alt={`${props.username}'s profile `} src={props.profileImgUrl} />
      </div>
      <div>
      <Link to={`/user/${props.username}`}>
      { props.username}
      </Link>
      </div>
      </div>
      <div className="follow-right">
      <button  className="follow-button follow-btn-small"> Follow </button>
      </div>
    </div>
  )
}

export default connect(null, {followUser})(Follower);
