import React from "react";
import {connect} from "react-redux";

const PopError = (props) => {
  return(
    <div className="popup-box" style={{padding: "40px", boxShadow:"0 0 10px 2px #FF0000AB"}}>
    <h3> Uh oh!</h3>
    <h3>You found a <span style={{color:"red"}}> {props.error.code} </span> error </h3>
      {props.error.message}
    </div>
  )
}

function mapStateToProps(state){
  return {
    error: state.errors,
  };
}

export default connect(mapStateToProps)(PopError)
