import React from "react";
import classNames from "classnames";
import {connect} from "react-redux";
import PropTypes from "prop-types";

const SlideBox = ({backAction, content}) =>{
//When clicking the back button, it will animate outwards (to left) then revert to previous page/action (passed in through props)
  const back = () =>{
    backAction()
  }
    return(
    <div className={classNames({"container-box": true})}>
      <div className={classNames({"hide-box": true})} >
      </div>
      <div onClick={back} className="back-button">
        <div className="back-icon"></div>
      </div>
        {content}
    </div>)
}

SlideBox.propTypes = {
  content: PropTypes.element.isRequired
}

function mapStateToProps(state){
  return {
    animate: state.animate,
  };
}

export default connect(mapStateToProps)(SlideBox)
