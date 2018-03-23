import React, { Component } from 'react';
import {NavLink} from "react-router-dom";
import { connect } from "react-redux"
import {logout } from "../store/actions/auth";
import "./Navbar.css";
class Navbar extends Component {
  logout = e => {
    e.preventDefault();
    this.props.logout()
  }
  render(){
    const s={color: "#ae27e8"};
    const {currentUser} = this.props;
    return(
        <nav>
          <div className="logo">
          {console.log(this.props)}
             <NavLink to="/" className="kinkon-logo"><li>Kinkon</li></NavLink>
          </div>
            {currentUser.isLoggedIn && (<div> <NavLink className="nav-new-message" to="/messages/new"> <li> POST </li> </NavLink> </div>)}
          <div className="navigation">
            {currentUser.isLoggedIn ?
                <div className="nav-links">
                  <NavLink  to="/user/5aa11225b286611188370312"> <li>{currentUser.user.username} </li></NavLink> 
                  <NavLink  to="/"  onClick={this.logout} ><li>Logout </li></NavLink> 
                </div>
           :
              <div className="nav-links">
                <NavLink  activeStyle={s} to="/signin"><li>Signin</li>  </NavLink>
                <NavLink  activeStyle={s} to="/signup"><li>SignUp </li></NavLink> 
              </div>
           } 
          </div>
        </nav>
      );
  }
}
function mapStateToProps(state){
  return {
    currentUser: state.currentUser
  };
}
export default connect(mapStateToProps, {logout})(Navbar);