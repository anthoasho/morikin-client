import React, { Component } from 'react';
import {NavLink} from "react-router-dom";
import { connect } from "react-redux"
import {logout } from "../store/actions/auth";
import "./Navbar.css";
class Navbar extends Component {
  //logout removes the token in headers, followed by a redirect to login page

  logout = e => {
    e.preventDefault();
    this.props.logout()
    this.props.history.push("/");
  }
  render(){
    //Current user is passed through props to display Username in the Navbar
    //TODO Navbar is no longer visible when not logged in, remove the if statements
    const {currentUser} = this.props;
    return(
        <nav>
          <div className="logo">
             <NavLink to="/" className="kinkon-logo"><li>Kinkon</li></NavLink>
          </div>
            {currentUser.isLoggedIn && (<div> <NavLink className="nav-new-message" to="/new"> <li> POST </li> </NavLink> </div>)}
          <div className="navigation">
            {currentUser.isLoggedIn ?
                <div className="nav-links">
                  <NavLink  to={`/${currentUser.user.username}`}> <li>{currentUser.user.username} </li></NavLink>
                  <NavLink  to="/"  onClick={this.logout} ><li>Logout </li></NavLink>
                </div>
           :
              <div className="nav-links">
                <NavLink  activeStyle={"#ffffffab"} to="/signin"><li>Signin</li>  </NavLink>
                <NavLink  activeStyle={"#ffffffab"} to="/signup"><li>SignUp </li></NavLink>
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
