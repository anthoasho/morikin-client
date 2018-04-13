import React, {Component} from "react";
import {connect } from "react-redux";
import {editProfile} from "../store/actions/userProfile";
import {Link} from "react-router-dom";
import "./EditProfile.css";
import ProfileImg from "../common/ProfileImg";
import Input from "../common/InputField";
class EditProfile extends Component{
  constructor(props){
    super(props)
    let {user} = this.props;
    this.state = {username: user.username,
                  email: user.email,
                  passwordOne: "",
                  passwordTwo: "",
                  profileImgUrl: user.profileImgUrl,
                  displayName: user.displayName,
                  profileColor: user.profileColor
                  };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = (name, value) =>{
    this.setState({
        [name]: value
    });
  }
  handleSubmit = e =>{
    e.preventDefault();
    this.props.editProfile(this.state).then(() => {
    })
    .catch(() => {
      return;
    });
  }
  handleFocus = e=>{
    e.preventDefault();
  }
  render(){
    const {username, email, passwordOne, displayName, passwordTwo, profileImgUrl, profileColor} = this.state;
    const {errors, user} = this.props;

    if(!this.props.isLoggedIn){
      return(
        <div className="landing-page">
          <div className="home-box">
            <div><h2>Welcome to Kinkon</h2></div>
            <div> <Link to="/signup"><button className="sign-up-btn">Sign Up</button></Link></div>
            <div> <Link to="/signin"><button className="sign-in-btn">Sign In</button></Link></div>
          </div>
        </div>
        );
    }
    return(
      <div className="edit-profile-container" style={{boxShadow: `0 -5px 4px -4px ${user.profileColor}`}}>
      <div>

      {errors.message && (<div> {errors.message} </div>) }
      </div>
      <div className="upper">
        <div className="img-wrapper small padded">
          <ProfileImg
            username={user.username}
            profileImg= {user.profileImgUrl}
            profileColor={user.profileColor}
          />
        </div>
        <div className="right-upper">
        <h3>Edit profile </h3>
        <Input
          type={"text"}
          name={"username"}
          placeholder={"Username"}
          value={username}
          onChange={this.handleChange}

        />
        {/*<div className="input-style"> <input className="test-input" type="text" name="username" placeholder="Username" value={username} onfocus={this.handleFocus} onChange={this.handleChange}/><hr className={classNames({input-hr:true, hr-active:this.state.active})}"input-hr"/> </div>*/}

        </div>
      </div>
      <form
      className="edit-profile-form"
        onSubmit = {this.handleSubmit}
        ><div className="form-grouping">
        <Input
          type={"text"}
          name={"displayName"}
          placeholder={"Display Name"}
          value={displayName}
          onChange={this.handleChange}
        />
        <Input
          type={"text"}
          name={"email"}
          placeholder={"Email Address"}
          value={email}
          onChange={this.handleChange}
        />
        </div>
        <div className="form-grouping">
        <Input
          type={"password"}
          name={"passwordOne"}
          placeholder={"Password"}
          value={passwordOne}
          onChange={this.handleChange}
        />
        <Input
          type={"password"}
          name={"passwordTwo"}
          placeholder={"Repeat your password"}
          value={passwordTwo}
          onChange={this.handleChange}
        />
          </div>
        <div className="form-grouping">
        <Input
          type={"text"}
          name={"profileImgUrl"}
          placeholder={"URL of your Profile Image"}
          value={profileImgUrl}
          onChange={this.handleChange}
        />
        <Input
          type="text"
          name={"profileColor"}
          placeholder={"Profile Color"}
          value={profileColor}
          onChange={this.handleChange}
        />
          </div>
        <button className="submit-button"> submit  </button>
      </form>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    user: state.currentUser.user,
    isLoggedIn: state.currentUser.isLoggedIn,
    errors: state.errors
  };
}

export default connect(mapStateToProps, {editProfile})(EditProfile);
