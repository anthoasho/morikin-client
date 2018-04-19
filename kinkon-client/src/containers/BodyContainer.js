import React from 'react';
import Timeline from "../components/Timeline";
const BodyContainer = (props) => {

    return(
      <div className="body-container">
        <Timeline
          key={`timeline:${props.match.url}`}
          user={props.profile.user}
          url={props.match}
          {...props}
          />
      </div>
      );
};

export default BodyContainer;
