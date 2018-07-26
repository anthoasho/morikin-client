import React from 'react';
import PropTypes from "prop-types";
import Timeline from "./home/Timeline";
import {withRouter} from "react-router-dom";
import {setContext} from "../store/actions/UI";
import classNames from "classnames";
import {connect} from "react-redux";

const BodyContainer = (props) => {
  let user = {
    dashboard: null,
    profile: props.match.params.id,
    myProfile: props.currentUser.username
  }

  return(
      <div className={classNames({"body-container": true, "animation-test": props.profileHide})}>
        <Timeline
          key={`timeline:${props.match.url}`}
          page={props.page}
          fetcher={user[props.page]}
          />

      </div>
    )
};

BodyContainer.propTypes = {
  currentUser: PropTypes.object,
  errors: PropTypes.object,
  isMobile: PropTypes.bool
}

function mapStateToProps(state){
  return {
    currentUser: state.myProfile.auth,
    errors: state.errors,
    isMobile: state.ui.isMobile,
    context: state.ui.context,
    profileHide: state.animate.profileHide,
    loading: state.ui.isLoading
  };
}
export default withRouter(connect(mapStateToProps, {setContext})(BodyContainer));
