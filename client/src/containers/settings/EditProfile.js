import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect } from "react-redux";
import {editProfile} from "../../store/actions/userProfile";
import {sidebarHide} from "../../store/actions/UI";
import "./EditProfile.css";
import Input from "../../common/InputField";
class EditProfile extends Component{
  constructor(props){
    super(props)
    let {user} = this.props;
    //Decided to fill with default values of information already present - password is exempt from this
    //TODO handle password change, make it a separate entity
    this.state = {username: user.username || "",
                  email: user.email || "",
                  profileImgUrl: user.profileImgUrl|| "",
                  displayName: user.displayName || "",
                  passwordOne: "",
                  passwordTwo:"",
                  profileColor: user.profileColor || "",
                  description: user.description || ""
                };
    this.handlePageChange = this.handlePageChange.bind(this);
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
    this.props.editProfile(this.state, this.redirect)
  }
  redirect = () => {
    this.props.sidebarHide()
    this.props.history.push("/")
  }
  handleFocus = e=>{
    e.preventDefault();
  }
  handlePageChange = page => {
    this.setState({
      page: page
    })
  }
  title = () => {
    switch(this.props.editPage){
      case "info":
        return "Edit your Personal Information"
      case "customisation":
        return "Make your profile yours"
      case "security":
        return "Want to change your email address?"
      case "password":
        return "Change your password"
      default:
        return "Edit profile"
  }
}
  //TODO redesign/alter this
  render(){
    const {username, email, displayName,  profileImgUrl, profileColor, description, passwordOne, passwordTwo} = this.state;
    const {errors, editPage} = this.props;
    return(<div className="fullscreen">
    <h3> {this.title()} </h3>
      <div className="fullscreen"  onClick ={() => {this.redirect() } }></div>
      <form
      className="edit-profile-form"
        onSubmit = {this.handleSubmit}
        >
        {errors.message && (<div> {errors.message} </div>) }
        {editPage === "info" &&<Input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={this.handleChange}
        />}
          {editPage === "customisation" &&<Input
          type="text"
          name="displayName"
          placeholder="Display Name"
          value={displayName}
          onChange={this.handleChange}
        />
      }
          {editPage === "info" &&<Input
              type="text"
              name="description"
              placeholder="Profile Description"
              value={description}
              onChange={this.handleChange}
          />
        }
          {editPage === "security" &&<Input
          type="text"
          name="email"
          placeholder="Email Address"
          value={email}
          onChange={this.handleChange}
        />
      }

          {editPage === "password" &&<Input
          type="password"
          name="passwordOne"
          placeholder="Password"
          value={passwordOne}
          onChange={this.handleChange}
        />}
          {editPage === "password" && <Input
          type="password"
          name="passwordTwo"
          placeholder="Repeat your password"
          value={passwordTwo}
          onChange={this.handleChange}
        />
      }

          {editPage === "customisation" && <Input
          type="text"
          name="profileImgUrl"
          placeholder="URL of your Profile Image"
          value={profileImgUrl}
          onChange={this.handleChange}
        />
        }

        {editPage === "customisation" &&  <Input
          type="dropdown"
          options={["Teal", "Olive", "Purple", "Green", "Orange"]}
          color={this.state.profileColor}
          name="profileColor"
          placeholder="Profile Color"
          value={profileColor}
          onChange={this.handleChange}
        />
      }
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
    errors: state.errors,
    editPage: state.ui.editProfilePage
  };
}

export default connect(mapStateToProps, {editProfile, sidebarHide})(EditProfile);
