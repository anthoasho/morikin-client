import React, { Component } from 'react';
import {NavLink} from "react-router-dom";
import "./Navbar.css";
class Navbar extends Component {
  static defaultProps = {
        onLogout(){
        },
        onSave(){
        }
    }
  render(){
    const s={color: "#ae27e8"};
    const {user} = this.props;
    const {onLogout} = this.props;
    return(
        <nav>
          <div className="logo">
             <NavLink to="/" className="kinkon-logo"><li>Kinkon</li></NavLink>
          </div>
            {user.isLoggedIn ?<div> <NavLink className="nav-new-message" to="/new"> <li> POST </li> </NavLink> </div>: null}
          <div className="navigation">
            {user.isLoggedIn ?
                <div className="nav-links">
                  <NavLink  to="/"> <li>{user.username} </li></NavLink> 
                  <NavLink  to="/"  onClick={onLogout} ><li>Logout </li></NavLink> 
                </div>
           :
              <div className="nav-links">
                <NavLink  activeStyle={s} to="/login"><li>Login</li>  </NavLink>
                <NavLink  activeStyle={s} to="/signup"><li>SignUp </li></NavLink> 
              </div>
           } 
          </div>
        </nav>
      );
  }
}

export default Navbar;