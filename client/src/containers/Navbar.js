import React from 'react';
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";
import { connect } from "react-redux"
import {animateProfile} from "../store/actions/animate";
import classNames from "classnames";
import {Logo} from "../common/logo.js";
import {showNewMessage, sidebarShow} from "../store/actions/UI";
import FontAwesome from "react-fontawesome";
import "./Navbar.css";
const Navbar = (props) => {
  function handlePopUpShow(){
    let obj = {
      method: "postMessage",
    }
    if(props.location.pathname !== "/"){
      props.history.push("/")
      setTimeout(() => props.showNewMessage(obj), 200)
    }
    props.showNewMessage(obj)
  }

  const {history, currentUser, context } = props;
  const handleLogoClick = () => {
    window.scrollTo({
      top:0,
      behavior: "smooth"
    })
  }
  const handleHamburger = () => {
    props.sidebarShow()
  }
  const handleBack = () => {
    props.animateProfile()
    setTimeout(history.goBack, 300)
    setTimeout(props.animateProfile, 300)
  }
  if(props.isMobile){
    return (<nav>
      <div className={classNames({"hamburger": true, "shift-hamburger": (context === "profile")})} onClick={handleHamburger} > <div className="hamburger-line"></div></div>
      <div onClick={handleLogoClick}  className="nav-logo" ><Logo /> </div>
        {context === "profile" && <div className={classNames({"back-button": true, "transition": true, "no-opacity": props.profileHide})} onClick={handleBack }> <div className={classNames({"back-icon": true, "transition": true, "no-opacity": props.profileHide})}> </div> </div>}
        {context === "profile" && <div  className={classNames({"profile-user-nav": true, "transition": true, "no-opacity": props.profileHide})}> {!props.isLoading && props.profile.username} </div>}
      </nav>
    )
  }
  return(
      <nav>
        {currentUser.isLoggedIn && <div className="hamburger" onClick={handleHamburger} > <div className="hamburger-line"></div></div>}
         <div onClick={() => props.history.push("/")} className="nav-logo"> <Logo /> </div>
        {/*<NavLink to="/"  className="site-logo" ><li>Morikin</li></NavLink> */}
          {currentUser.isLoggedIn && <a  onClick={handlePopUpShow} className="nav-new-message"><span > New Post </span><FontAwesome name='pencil-alt' className="nav-icon"  />  </a> }
        <NavLink  to={`/myprofile`} className="nav-username"> <li >{currentUser.username} </li></NavLink>
      {!currentUser.isLoggedIn &&  <NavLink  to={`/signin`} className="nav-signin"> <li >Sign in</li></NavLink>}
      {!currentUser.isLoggedIn &&  <NavLink  to={`/signup`} className="nav-signup"> <li >Sign up</li></NavLink>}
      </nav>
    );
}
Navbar.propTypes= {
  currentUser: PropTypes.object,
  isMobile: PropTypes.bool,
  logout: PropTypes.func,
  showNewMessage: PropTypes.func,


}

function mapStateToProps(state){
  return {
    currentUser: state.myProfile.auth,
    isMobile: state.ui.isMobile,
    context: state.ui.context,
    profile: state.profile.profile.user,
    isLoading: state.ui.isLoading
  };
}
export default connect(mapStateToProps, { showNewMessage, animateProfile, sidebarShow})(Navbar);
