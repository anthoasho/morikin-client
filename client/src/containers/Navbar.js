import React from 'react';
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";
import { connect } from "react-redux"
import {logout } from "../store/actions/auth";
import {animateEnter, animateProfile} from "../store/actions/animate";
import classNames from "classnames";
import {Logo} from "../common/logo.js";
import {showNewMessage} from "../store/actions/UI";
import FontAwesome from "react-fontawesome";
import "./Navbar.css";
const Navbar = (props) => {
  function handlePopUpShow(){
    let obj = {
      method: "postMessage",
    }
    if(props.location.pathname === "/editprofile"){
      props.history.push("/")
      setTimeout(() => props.showNewMessage(obj), 200)
    }
    props.showNewMessage(obj)
  }

  const {logout, history, animateEnter, currentUser, context } = props;
  //logout removes the token in headers, followed by a redirect to login page
  const handleLogout = e =>{
    e.preventDefault();
    logout()
    history.push("/");
    animateEnter();
  }
  // let place = location.pathname.split("/")[1];
  // const locationTest = (test) =>{
  //   if(place === test ){
  //     return true
  //   }
  // }
  const handleLogoClick = () => {
    window.scrollTo({
      top:0,
      behavior: "smooth"
    })
  }
  const handleBack = () => {
    props.animateProfile()
    setTimeout(history.goBack, 300)
    setTimeout(props.animateProfile, 300)
  }
  if(props.isMobile){
    return (<nav>
      <div onClick={handleLogoClick}  className="nav-logo" ><Logo /> </div>
        {context === "profile" && <div className={classNames({"back-button": true, "transition": true, "no-opacity": props.profileHide})} onClick={handleBack }> <div className={classNames({"back-icon": true, "transition": true, "no-opacity": props.profileHide})}> </div> </div>}
        {context === "profile" && <div  className={classNames({"profile-user-nav": true, "transition": true, "no-opacity": props.profileHide})}> {!props.isLoading && props.profile.username} </div>}
        {context === "myProfile" && <NavLink  to="/"  onClick={handleLogout} className="nav-logout"><li >Logout </li></NavLink>}

      </nav>
    )
  }
  return(
      <nav>
         <div onClick={() => this.props.push("/")} className="nav-logo"> <Logo /> </div>
        <NavLink to="/"  className="site-logo" ><li>Morikin</li></NavLink>
        <a  onClick={handlePopUpShow} className="nav-new-message"><span > New Post </span><FontAwesome name='pencil-alt' className="nav-icon"  />  </a>
        <NavLink  to={`/myprofile`} className="nav-username"> <li >{currentUser.username} </li></NavLink>
        <NavLink  to="/"  onClick={handleLogout} className="nav-logout"><li >Logout </li></NavLink>
      </nav>
    );
}
Navbar.propTypes= {
  currentUser: PropTypes.object,
  isMobile: PropTypes.bool,
  logout: PropTypes.func,
  animateEnter: PropTypes.func,
  showNewMessage: PropTypes.func,


}

function mapStateToProps(state){
  return {
    currentUser: state.myProfile.auth,
    isMobile: state.ui.isMobile,
    context: state.ui.context,
    profile: state.profile.profile.user,
    profileHide: state.animate.profileHide,
    isLoading: state.ui.isLoading
  };
}
export default connect(mapStateToProps, {logout, animateEnter, showNewMessage, animateProfile})(Navbar);
