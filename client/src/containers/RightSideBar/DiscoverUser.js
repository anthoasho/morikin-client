import React from "react";
import ProfileImg from "../../common/ProfileImg";
import {Link} from "react-router-dom";

const DiscoverUser = props => {

  const users = props.users.map(user => {
    return <DiscoverUserIndividual key={`discover-${user.username}`} user={user}/>
  })
  return(
    <div className="discover-follow">
      <div className="discover-titles">People you may know </div>
      <div className="discover-follow-list">
        {users}
      </div>
  </div>
  )
}

const DiscoverUserIndividual = ({user}) => {
  return(
    <div className="discover-icons">
      <ProfileImg
        username={user.username}
        profileImg= {user.profileImgUrl}
        profileColor={user.profileColor}
        loading={false}
      />
      <div className="discover-username">
            <Link to={`/${user.username}`}><span  style={{color:user.profileColor, textAlign: "left", fontSize:"0.7rem", padding:"0 0 0 3px"}}> @{user.username}  </span></Link>
      </div>
    </div>
  )
}

export default DiscoverUser