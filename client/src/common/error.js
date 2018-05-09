import React from "react";
import {connect} from "react-redux";

//Basic error handling - pops up when API returns an error
const PopError = (props) => {
  return(
    <div className="popup-box" style={{padding: "40px", boxShadow:"0 0 10px 2px #FF0000AB"}}>
    <div className="error-content">
      <h3 className="error-title"> Uh oh!</h3>
      <h3 className="error-code">You found a <span style={{color:"red"}}> {props.error.code} </span> error </h3>
        <p className="error-message">{props.error.message}</p>
        </div>
    </div>
  )
}

function mapStateToProps(state){
  return {
    error: state.errors,
  };
}

export default connect(mapStateToProps)(PopError)
