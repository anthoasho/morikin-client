import React from "react";
import PropTypes from "prop-types";
import ProfileImg from "../../common/ProfileImg";
import {Link} from "react-router-dom";
import {getDiscoverUsers} from "../../store/actions/userProfile";
import {connect} from "react-redux";

const DiscoverUser = props => {
    // props.getDiscoverUsers();
  const users = props.discover.map(user => {
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
DiscoverUser.propTypes ={
  discover: PropTypes.array
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

DiscoverUserIndividual.propTypes = {
    user: PropTypes.object
}


function mapStateToProps(state){
  return {
    discover: state.discover.users,

  };
}
export default connect(mapStateToProps, {getDiscoverUsers})(DiscoverUser)
