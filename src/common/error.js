import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {retry} from "../store/actions/userProfile"
import {popupHide} from "../store/actions/errors";
import classNames from "classnames";
//Basic error handling - pops up when API returns an error
const Popup = (props) => {
  return(
    <div className={classNames({"bottom-popup": true, "bottom-popup-show": (props.error.popup), "error-dialog": props.errorBool, "info-dialog": props.infoBool})}>
      {props.children}
    </div>
  )
}
export const PopupDialog = (props)=>{
  let errorBool = (props.error.method === "error");
  let infoBool = (props.error.method === "info");
  return(
    <Popup error={props.error} errorBool={errorBool} infoBool={infoBool}>
      <p>{errorBool &&  `${props.error.code} Error.`} </p>
      <p> {props.error.message}</p>
      {props.error.text === "Retry?" && <p className="error-btn" onClick={() => props.retry(props.error.func, props.error.args)}> {props.error.text} </p>}
      {props.error.text === "Go Back" &&<p className="error-btn" onClick={() => props.goBack()}> {props.error.text} </p>}
      {props.error.text === "Close" &&<p className="error-btn" onClick={props.popupHide}> {props.error.text} </p>}
    </Popup>
  )
}

PopupDialog.propTypes = {
  error: PropTypes.object
}

function mapStateToProps(state){
  return {
    error: state.errors,
  };
}

export default connect(mapStateToProps, {retry, popupHide})(PopupDialog)
