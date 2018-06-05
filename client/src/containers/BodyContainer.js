import React from 'react';
import PropTypes from "prop-types";
import TabNav from "./Mobile/Tab";
import Timeline from "./home/Timeline";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
const BodyContainer = (props) => {
//     return(
//     <div className="body-container">
//       <Mobile
//         key={`timeline:${props.match.url}`}
//         />
//     </div>
//   )
// }
// else{
  return(
      <div className="body-container">
        <Timeline
          key={`timeline:${props.match.url}`}
          />
        {props.isMobile &&<TabNav />}
      </div>
    )
    // }
};

BodyContainer.propTypes = {
  currentUser: PropTypes.object,
  errors: PropTypes.object,
  isMobile: PropTypes.bool
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
    errors: state.errors,
    isMobile: state.ui.isMobile
  };
}
export default withRouter(connect(mapStateToProps)(BodyContainer));
