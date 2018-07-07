import React, {Component} from "react";
import PropTypes from "prop-types";
import "./Auth.css"
import Input from "../../common/InputField";
import {Button} from "../../common/Button";
import { removeError } from "../../store/actions/errors";
import {connect} from "react-redux";
class AuthForm extends Component {
  constructor(props){
    super(props);
    this.state = {username: "",
                  password: "",
                  email: "",
                  loading: true
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
    this.setState({
              password: "",
              profileImgUrl: ""
              });

  }
  componentWillMount(){
    if(this.props.errors.message){
      this.setState({
        loading: false
      })
    }
  }
  componentWillUnmount(){
    this.props.history.push("/")
  }
render(){
    const {username, email, password, profileImgUrl } = this.state;
    const {heading, buttonText, signUp, errors, loading } = this.props;

    const form = (<div className="login-form-container"><p className="title">      {errors.message ? (<p className="login-error"> {errors.message}  </p>) : heading }</p>

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
        autoFocus
        autocomplete="off"
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
          placeholder="Email Address (optional)"
          value={email}
          isRequired={true}
          onChange={this.handleChange}
        /> )}
      {signUp && (
        <Input
          type="text"
          name="profileImgUrl"
          placeholder="Url of your Profile Picture (optional)"
          value={profileImgUrl}
          onChange={this.handleChange}
        />
      )}
      <Button
        type="submit"
        text={buttonText}
        loading={loading}>
          {buttonText}
     </Button>
  </form></div>)
    return(
      form
      );
  }
}

AuthForm.propTypes = {
  heading: PropTypes.string,
  buttonText: PropTypes.string,
  signUp: PropTypes.bool,
  errors: PropTypes.object,
}

function mapStateToProps(state){
  return {
    errors: state.errors,
    isLoggedIn: state.myProfile.auth.isLoggedIn,
    loading: state.ui.loading
  };
}

export default connect(mapStateToProps, {removeError})(AuthForm)
