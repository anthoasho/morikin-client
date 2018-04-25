import React from 'react';
import {NavLink} from "react-router-dom";
import { connect } from "react-redux"
import {logout } from "../store/actions/auth";
import {animateEnter} from "../store/actions/animate";
import {Logo} from "../common/logo.js";
import "./Navbar.css";
const Navbar = (props) => {
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
  return(
      <nav> <div className="nav-logo"> <Logo width="auto" height="100%"/> </div>
           <NavLink to="/"  className="site-logo" ><li>Morikin</li></NavLink>
           <NavLink  to="/new" className="nav-new-message"> <li > POST </li> </NavLink>
           <NavLink  to={`/${currentUser.username}`} className="nav-username"> <li >{currentUser.username} </li></NavLink>
           <NavLink  to="/"  onClick={handleLogout} className="nav-logout"><li >Logout </li></NavLink>
      </nav>
    );
}
function mapStateToProps(state){
  return {
    currentUser: state.currentUser.user
  };
}
export default connect(mapStateToProps, {logout, animateEnter})(Navbar);
