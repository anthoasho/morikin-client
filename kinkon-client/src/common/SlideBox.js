import React from "react";
import classNames from "classnames";
import {animateEnter, animateEnterReverse, animateExit, animateExitReverse} from "../store/actions/animate";
import {connect} from "react-redux";

const SlideBox = ({animate, backAction, content, animateEnter, animateEnterReverse, animateExit, animateExitReverse}) =>{
//When clicking the back button, it will animate outwards (to left) then revert to previous page/action (passed in through props)
  const back = () =>{

    animateExitReverse()
    backAction()
  }

    return(
    <div className={classNames({"home-box": true, "exit-animation": animate.exit, "exit-animation-reverse": animate.exitReverse})}>
      <div onClick={back} className="back-button"> <div className="back-icon"></div> </div>
        {content}
    </div>)
}

function mapStateToProps(state){
  return {
    animate: state.animate,
  };
}

export default connect(mapStateToProps, {animateEnter, animateEnterReverse, animateExit, animateExitReverse})(SlideBox)
