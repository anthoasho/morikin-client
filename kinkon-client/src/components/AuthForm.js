import React, {Component} from "react";
import "./Auth.css"
import Input from "../common/InputField";
import {Button} from "../common/Button";
import classNames from "classnames";
/*
-------------------------------------------------------------
PLEASE DO SOME KIND OF REACT VALIDATION
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
  handleChange = (name, value) =>{
    this.setState({
        [name]: value
    });
  }
  handleSubmit = e =>{
    e.preventDefault();
    const authType = this.props.signUp ? "signup" : "signin"; //Clarify type of API call to be used through props
    this.props.onAuth(authType, this.state)
    this.setState({username: "",
              email: "",
              password: "",
              profileImgUrl: ""
              });
  }
render(){
    const {username, email, password, profileImgUrl } = this.state;
    const {heading, buttonText, signUp, errors, history, removeError, backAction, exit, exitReverse } = this.props; //TODO check these are necessary
    history.listen(() => {
      removeError();
    });
    return(
      <div className={classNames({"home-box": true, "exit-animation": exit, "exit-animation-reverse": exitReverse})}>
      <div onClick={backAction} className="back-button"> <div className="back-icon"></div> </div>
        <p className="title"> {heading} </p>
        {errors.message && (<p className="login-error"> {errors.message} </p>) }
        <form
        className="login-form"
          onSubmit = {this.handleSubmit}
          >
          <Input
            ref="username"
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={this.handleChange}
            isRequired={true}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            isRequired={true}
            onChange={this.handleChange}
          />
          {signUp && (
            <Input
              type="text"
              name="email"
              placeholder="Email Address"
              value={email}
              isRequired={true}
              onChange={this.handleChange}
            /> )}
          {signUp && (
            <Input
              type="text"
              name="profileImgUrl"
              placeholder="Url of your Profile Picture"
              value={profileImgUrl}
              onChange={this.handleChange}
            />
          )}
          <Button
            type="submit"
            text={buttonText} />
      </form>
      </div>
      );
  }
}
