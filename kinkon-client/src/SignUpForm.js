import React, { Component } from 'react';
class SignUpForm extends Component {
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
  handleChange(e){
    this.setState({
        [e.target.name]: e.target.value
    });
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.signUp(this.state);
    this.setState({username: "",
              email: "",
              password: "",
              profileImgUrl: ""
              });
  }
  render(){
    return(
      <div className ="login-container">
        <p className="title"> Join KinKon </p>
        <form
        className="login-form"
          onSubmit = {this.handleSubmit}
          >
            <input 
            type="text"
            name="email"
            placeholder="Email address"
            value ={this.state.email}
            onChange = {this.handleChange}
          /> 
          <p>  </p>
          <input 
            type="text"
            name="username"
            placeholder="Username"
            value ={this.state.username}
            onChange = {this.handleChange}
          /> 
          <input 
            type="password"
            name="password"
            placeholder="Password"
            value ={this.state.password}
            onChange = {this.handleChange}
          /> 
          <input 
            type="text"
            name="profileImgUrl"
            placeholder="Profile Picture URL"
            value ={this.state.profileImgUrl}
            onChange = {this.handleChange}
          /> 
          <button> Sign me up! </button>
      </form>
      </div>
      );
  }  
}
export default SignUpForm;
