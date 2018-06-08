import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect } from "react-redux";
import {editProfile} from "../../store/actions/userProfile";
// import {Link} from "react-router-dom";
import "./EditProfile.css";
import ProfileImg from "../../common/ProfileImg";
import Input from "../../common/InputField";
class EditProfile extends Component{
  constructor(props){
    super(props)
    let {user} = this.props;
    //Decided to fill with default values of information already present - password is exempt from this
    //TODO handle password change, make it a separate entity
    this.state = {username: user.username,
                  email: user.email,
                  passwordOne: "",
                  passwordTwo: "",
                  profileImgUrl: user.profileImgUrl,
                  displayName: user.displayName,
                  profileColor: user.profileColor,
                  description: user.description
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
    this.props.editProfile(this.state)
    setTimeout( () => this.props.history.push("/"), 300)
  }
  handleFocus = e=>{
    e.preventDefault();
  }

  //TODO redesign/alter this
  render(){
    const {username, email, displayName,  profileImgUrl, profileColor, description} = this.state;
    const {errors, user} = this.props;
    return(
      <div className="edit-profile-container" style={{boxShadow: `0 -5px 4px -4px ${user.profileColor}`}}>
      <div>

      {errors.message && (<div> {errors.message} </div>) }
      </div>
        <div className="img-wrapper small padded">
            <ProfileImg
              username={user.username}
              profileImg= {user.profileImgUrl}
              profileColor={user.profileColor}
            />
          </div>

          <div className="edit-profile-title">
            <h3>Edit profile </h3>
            <h3>{user.username}</h3>
          </div>
      <form
      className="edit-profile-form"
        onSubmit = {this.handleSubmit}
        >

        <Input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={this.handleChange}
        />
        <Input
          type="text"
          name="displayName"
          placeholder="Display Name"
          value={displayName}
          onChange={this.handleChange}
        />
        <Input
              type="text"
              name="description"
              placeholder="Profile Description"
              value={description}
              onChange={this.handleChange}
          />
        <Input
          type="text"
          name="email"
          placeholder="Email Address"
          value={email}
          onChange={this.handleChange}
        />
{/*
        <Input
          type="password"
          name="passwordOne"
          placeholder="Password"
          value={passwordOne}
          onChange={this.handleChange}
        />
        <Input
          type="password"
          name="passwordTwo"
          placeholder="Repeat your password"
          value={passwordTwo}
          onChange={this.handleChange}
        />
      */}
        <Input
          type="text"
          name="profileImgUrl"
          placeholder="URL of your Profile Image"
          value={profileImgUrl}
          onChange={this.handleChange}
        />

        <Input
          type="text"
          name="profileColor"
          placeholder="Profile Color"
          value={profileColor}
          onChange={this.handleChange}
        />
        <button className="submit-button"> submit  </button>
      </form>
      </div>
    )
  }
}
EditProfile.propTypes = {
  user: PropTypes.object,
  isLoggedIn: PropTypes.bool,
  errors: PropTypes.object,
  editProfile: PropTypes.func

}


function mapStateToProps(state){
  return {
    user: state.myProfile.auth,
    isLoggedIn: state.myProfile.auth.isLoggedIn,
    errors: state.errors
  };
}

export default connect(mapStateToProps, {editProfile})(EditProfile);
