import React, {Component} from "react";
import {connect } from "react-redux";
import {logout } from "../../store/actions/auth";
import {sidebarShow, sidebarHide, editProfilePageChange} from "../../store/actions/UI";
import classNames from "classnames";
import "./sidebar.css";


class Sidebar extends Component{
  constructor(props){
    super(props)
    this.state = {page: "default"};
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSidebarHide = this.handleSidebarHide.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutisde = this.handleClickOutisde.bind(this);
  }
  handlePageChange = (page, url, close) => {
    this.setState({
      page: page
    })
    this.props.editProfilePageChange(page)
    if((this.props.history.location.pathname !== url)){
      this.props.history.push(url)
    }
    if(close){
      this.handleSidebarHide()
    }
    if(this.props.isMobile){
      this.props.sidebarHide();
    }
  }
  handleSidebarHide =() => {
    this.props.sidebarHide();
    if(this.props.history.location.pathname === "/editprofile"){
      this.props.history.push("/")
    }
    this.setState({
      page: "default"
    })
  }
  componentDidMount(){
    if(this.props.isMobile){

      document.addEventListener("mousedown", this.handleClickOutisde);
    }
  }
  componentWillUnmount(){
    if(this.props.isMobile){
      document.removeEventListener("mousedown", this.handleClickOutisde);
    }
  }
  handleClickOutisde(e){
    if(this.wrapperRef && !this.wrapperRef.contains(e.target)){
      this.props.sidebarHide();

    }
  }
  setWrapperRef = (node) =>{
    this.wrapperRef = node;
  }

  render(){
    let {sidebarVisibility, logout, currentUser} = this.props
    let {page} = this.state
  return(
    <div ref={this.setWrapperRef} className={classNames({"sidebar-main": true, "sidebar-show": sidebarVisibility})} >
      <div onClick={this.handleSidebarHide} className="exit-sidebar">  </div>
        <ul className="sidebar-menu">
          <li className={classNames({"active": (this.props.history.location.pathname === "/")})} onClick={()=> this.handlePageChange("default", "/", true)}>Home</li>
           { currentUser &&<li className={classNames({"active": (this.props.history.location.pathname === "/myprofile")})} onClick={()=> this.handlePageChange("info", "/myprofile", true)}>My Profile</li>}
          { currentUser &&<li className={classNames({"active": (this.props.history.location.pathname === "/editprofile") && (page === "info")})} onClick={()=> this.handlePageChange("info", "/editprofile")}>Personal Info</li>}
          { currentUser &&<li className={classNames({"active": (this.props.history.location.pathname === "/editprofile") && (page === "security")})} onClick={()=> this.handlePageChange("security", "/editprofile")}>Security</li>}
          { currentUser && <li className={classNames({"active": (this.props.history.location.pathname === "/editprofile") && (page === "customisation")})} onClick={()=> this.handlePageChange("customisation", "/editprofile")}>Customisation</li>}
          { !currentUser && <li className={classNames({"active": (this.props.history.location.pathname === "/signin")})} onClick={()=> this.handlePageChange("default", "/signin")}>Sign In</li>}
          { !currentUser && <li className={classNames({"active": (this.props.history.location.pathname === "/signup")})} onClick={()=> this.handlePageChange("default", "/signup")}>Sign Up</li>}

          {/*<li className={classNames({"active": (this.props.history.location.pathname === "/editprofile") && (page === "password")})} onClick={()=> this.handlePageChange("password", "/editprofile")}>Change your password</li> */}
          { currentUser && <li  onClick={()=> logout()}>Logout</li>}
        </ul>
      </div>
  )
}


}



function mapStateToProps(state){
  return {
    user: state.myProfile.auth,
    sidebarVisibility: state.ui.sidebarShow
  };
}

export default connect(mapStateToProps, {sidebarShow, sidebarHide, logout, editProfilePageChange})(Sidebar);
