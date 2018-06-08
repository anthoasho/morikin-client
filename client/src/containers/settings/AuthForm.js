import React, {Component} from "react";
import PropTypes from "prop-types";
import "./Auth.css"
import Input from "../../common/InputField";
import {Button} from "../../common/Button";
import {animateEnter, animateEnterReverse, animateExit, animateExitReverse} from "../../store/actions/animate";
import { removeError } from "../../store/actions/errors";
import {connect} from "react-redux";
import SlideBox from "../../common/SlideBox";
class AuthForm extends Component {
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
  //Every change takes the name of the field and applies that to the current state
  // Using this rather than an event event.target.name due to the custom Input field
  handleChange = (name, value) =>{
    this.setState({
        [name]: value
    });
    this.props.removeError();
  }
  handleSubmit = e =>{
    e.preventDefault();
    // this.props.history.push("/")
    this.props.removeError();
    //Clarify type of API call to be used through props to simplify the API call in store/actions
    const authType = this.props.signUp ? "signup" : "signin";
    this.props.onAuth(authType, this.state)
    this.setState({username: "",
              email: "",
              password: "",
              profileImgUrl: ""
              });
  }
  componentWillUnmount(){
    this.props.history.push("/")
  }
render(){
    const {username, email, password, profileImgUrl } = this.state;
    const {heading, buttonText, signUp, errors, backAction, exit, exitReverse } = this.props;

    const form = (<div className="login-form-container"><p className="title"> {heading} </p>
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
  </form></div>)
    return(
      <SlideBox
        exit={exit}
        exitReverse={exitReverse}
        backAction={backAction}
        content={form}
        />
      );
  }
}

AuthForm.propTypes = {
  heading: PropTypes.string,
  buttonText: PropTypes.string,
  signUp: PropTypes.bool,
  errors: PropTypes.object,
  backAction: PropTypes.func,
  exit: PropTypes.func,
  exitReverse: PropTypes.func
}

function mapStateToProps(state){
  return {
    animate: state.animate,
    errors: state.errors,
    isLoggedIn: state.myProfile.auth.isLoggedIn
  };
}

export default connect(mapStateToProps, {removeError, animateEnter, animateEnterReverse, animateExit, animateExitReverse})(AuthForm)
