import React from 'react';
// import Mobile from "./Mobile/mobile";
import Timeline from "./home/Timeline";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
const BodyContainer = (props) => {
//   if(props.isMobile){
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
      </div>
    )
    // }

};
function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
    errors: state.errors,
    isMobile: state.ui.isMobile
  };
}
export default withRouter(connect(mapStateToProps)(BodyContainer));
