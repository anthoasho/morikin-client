import React, {Component} from "react";
import {connect } from "react-redux";
import "./EditProfile.css";
import ProfileImg from "../common/ProfileImg"
class EditProfile extends Component{
  constructor(props){
    super(props)
    let {user} = this.props;
    console.log(user)
    this.state = {username: user.username,
                  email: user.email,
                  passwordOne: "",
                  passwordTwo: "",
                  profileImgUrl: user.profileImg,
                  profileColor: ""
                  };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = e =>{
    this.setState({
        [e.target.name]: e.target.value
    });
  }
  handleSubmit = e =>{
    e.preventDefault();
    const authType = this.props.signUp ? "signup" : "signin"; //Clarify type of API call to be used through props
    this.props.onAuth(authType, this.state).then(() => {
    this.props.history.push("/");
    })
    .catch(() => {
      return;
    });
    this.setState({username: "",
              email: "",
              password: "",
              profileImgUrl: ""
              });
  }

  render(){
    const {username, email, passwordOne, passwordTwo, profileImgUrl, profileColor} = this.state;
    const {errors, user} = this.props;


    return(
      <div className="edit-profile-container" style={{boxShadow: `0 -5px 4px -4px ${user.profileColor}`}}>
      <div>

      {errors.message && (<div> {errors.message} </div>) }
      </div>
      <div className="upper">
        <div className="img-wrapper small">
          <ProfileImg
            username={user.username}
            profileImg= {user.profileImgUrl}
            profileColor={user.profileColor}
          />
        </div>
        <div> {username} </div>
        <p>Edit profile </p>
      </div>
      <form
      className="edit-profile-form"
        onSubmit = {this.handleSubmit}
        ><div className="form-grouping">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value ={username}
          onChange = {this.handleChange}
        />
        <input
        type="text"
        name="email"
        placeholder="Email address"
        value ={email}
        onChange = {this.handleChange}
        />
        </div>
        <div className="form-grouping">
        <input
        type="password"
        name="passwordOne"
        placeholder="Password"
        value ={passwordOne}
        onChange = {this.handleChange}
        />
        <input
        type="password"
        name="passwordTwo"
        placeholder="Password (repeat)"
        value ={passwordTwo}
        onChange = {this.handleChange}
        />
          </div>
                  <div className="form-grouping">
          <input
          type="text"
          name="profileImgUrl"
          placeholder="Profile Picture URL"
          value ={profileImgUrl}
          onChange = {this.handleChange}
          />
          <input
            type="text"
            name="profileColor"
            placeholder="Profile Color"
            value ={profileImgUrl}
            onChange = {this.handleChange}
          />
          </div>
        <button> submit  </button>
      </form>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    user: state.currentUser.user,
    errors: state.errors
  };
}

export default connect(mapStateToProps)(EditProfile);
