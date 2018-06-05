import React from 'react';
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";
import { connect } from "react-redux"
import {logout } from "../store/actions/auth";
import {animateEnter} from "../store/actions/animate";
import {Logo} from "../common/logo.js";
import {showNewMessage} from "../store/actions/UI";
import "./Navbar.css";
const Navbar = (props) => {
  function handlePopUpShow(){
    let obj = {
      method: "postMessage",
    }
    props.showNewMessage(obj)
  }

  const {logout, history, animateEnter, currentUser} = props;
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

  if(props.isMobile){
    return (<nav>
      <NavLink to="/"  className="nav-logo" > <Logo /> </NavLink>
        <NavLink  to="/"  onClick={handleLogout} className="nav-logout"><li >Logout </li></NavLink>
      </nav>
    )
  }
  return(
      <nav>
        <div className="nav-logo"> <Logo /> </div>
        <NavLink to="/"  className="site-logo" ><li>Morikin</li></NavLink>
        <a  onClick={handlePopUpShow} className="nav-new-message"> <li > POST </li> </a>
        <NavLink  to={`/${currentUser.username}`} className="nav-username"> <li >{currentUser.username} </li></NavLink>
        <NavLink  to="/"  onClick={handleLogout} className="nav-logout"><li >Logout </li></NavLink>
      </nav>
    );
}
Navbar.propTypes= {
  currentUser: PropTypes.object,
  isMobile: PropTypes.bool,
  logout: PropTypes.func,
  animateEnter: PropTypes.func,
  showNewMessage: PropTypes.func

}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser.user,
    isMobile: state.ui.isMobile,
  };
}
export default connect(mapStateToProps, {logout, animateEnter, showNewMessage})(Navbar);
