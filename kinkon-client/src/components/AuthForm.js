import React, {Component} from "react";
import "./Auth.css"
/*
-------------------------------------------------------------

PLEASE FIX ERROR HANDLING - COMPLETELY BROKEN AS OF NOW

-------------------------------------------------------------


*/

export default class AuthForm extends Component {
  constructor(props){
    super(props);
    this.state = {username: "",
                  email: "",
                  password: "",
                  profileImgUrl: ""
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
    const {username, email, password, profileImgUrl } = this.state;
    const {heading, buttonText, signUp, errors, history, removeError } = this.props;
    history.listen(() => {
      removeError();
    })
    return(
      <div className ="auth-container">
        <p className="title"> {heading} </p>
        {errors.message && (<div> {errors.message} </div>) } 
        <form
        className="login-form"
          onSubmit = {this.handleSubmit}
          >
          <input 
            type="text"
            name="username"
            placeholder="Username"
            value ={username}
            onChange = {this.handleChange}
          /> 
          <input 
            type="password"
            name="password"
            placeholder="Password"
            value ={password}
            onChange = {this.handleChange}
          /> 
          {signUp && (
          <div className="signup"> 
            <input 
              type="text"
              name="email"
              placeholder="Email address"
              value ={email}
              onChange = {this.handleChange}
            /> 
            <input 
              type="text"
              name="profileImgUrl"
              placeholder="Profile Picture URL"
              value ={profileImgUrl}
              onChange = {this.handleChange}
            /> 
          </div>)}
          <button> {buttonText} </button>
      </form>
      </div>
      );
  }  
}