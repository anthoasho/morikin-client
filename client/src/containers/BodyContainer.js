import React from 'react';
import Timeline from "../components/Timeline";
import FollowList from "../components/FollowList";
const BodyContainer = (props) => {

    return(
      <div className="body-container">
      {props.follow &&
        <FollowList
          url={props.match.url}
          key={`${props.match.url}${props.profile.user.username}`}
          history={props.history}
          type={props.follow}
        />
      }
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
