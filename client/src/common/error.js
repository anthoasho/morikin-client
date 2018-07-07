import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";
import {Logo} from "../common/logo.js";
import {Link} from "react-router-dom";


//Basic error handling - pops up when API returns an error
const PopError = (props) => {
  return(
    <div className="popup-box" style={{padding: "40px", boxShadow:"0 0 10px 2px #FF0000AB"}}>
      <div className="error-content-right">
        <h3 className="error-title"> Uh oh!</h3>
        <h3 className="error-code">You found a <span style={{color:"red"}}> {props.error.code} </span> error </h3>
        <p className="error-message">{props.error.message}</p>
        <Link  to="/"  className="sign-up-btn sign-up-btn-active">Take me Home  </Link>
      </div>
      <div className="error-content-left">
          <div className="logo-error">
          <FontAwesome name='exclamation' className="icon-error "  />
          <Logo />
          </div>
      </div>
    </div>
  )
}

PopError.propTypes = {
  error: PropTypes.object
}

function mapStateToProps(state){
  return {
    error: state.errors,
  };
}

export default connect(mapStateToProps)(PopError)
