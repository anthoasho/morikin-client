import React, { Component } from 'react';
class LoginForm extends Component {
  constructor(props){
    super(props);
    this.state = {username: "",
                  password: "",
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
    this.props.signIn(this.state);
    this.setState({username: "",
              password: "",
              });
  }
  render(){
    return(
      <div className="login-container">
        <h2> Login </h2>
        <form
        className="login-form"
          onSubmit = {this.handleSubmit}
          >
          <input 
            placeholder="Username"
            type="text"
            name="username"
            value ={this.state.email}
            onChange = {this.handleChange}
          /> 
          <input 
            placeholder="Password"
            type="password"
            name="password"
            value ={this.state.password}
            onChange = {this.handleChange}
          /> 
          <button> submit </button>
      </form>
      </div>
      );
  }  
}

export default LoginForm;
