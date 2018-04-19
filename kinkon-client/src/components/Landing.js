import React, {Component} from "react";
import {Button} from "../common/Button";
import AuthForm from "../components/AuthForm";
import {Switch, Route} from "react-router-dom";
import {connect } from "react-redux";
import {authUser } from "../store/actions/auth";
import { removeError } from "../store/actions/errors";
import classNames from "classnames";
import "./Landing.css";

/*
---------------------------------------------

This no longer needs to be a component: TODO make a stateless function

---------------------------------------------

*/
class LandingPage extends Component{
  constructor(props){
    super(props);
    this.state={
      exit: false,
      exitReverse: false,
      enterReverse: true
    }
    this.handleClick = this.handleClick.bind(this);
    this.authThenRedirect = this.authThenRedirect.bind(this);
  }

  //This should change very soon due to redux
  //START changes
    handleClick(e, type){
      if(type==="next"){
      this.setState({
        exit: true
      })
      setTimeout(() =>{
        this.props.history.push(e)

        this.setState({
          exit:false
        })
      }, 500)
    }else if(type==="back"){
      this.setState({
        enterReverse:false,
        exitReverse: true
      })
      setTimeout(() =>{
        this.props.history.push(e)
        this.setState({
          exitReverse:false,
          enterReverse: true
        })
      }, 500)
    }
    }
    //END of changes for Redux
    authThenRedirect(...args){
      this.props.authUser(...args).then(()=>{
        this.props.history.push("/");
      })
    }
    render(){
    return(
      <div className="landing-page">
      <Switch>
      <Route exact path = "/signin" render={props => {
        return(
          <AuthForm removeError={this.props.removeError}
            errors={this.props.errors}
            onAuth={this.authThenRedirect} {...props}
            buttonText="Log in"
            heading="Welcome!"
            exit={this.state.exit}
            exitReverse={this.state.exitReverse}
            backAction={this.handleClick.bind(this, "/", "back")}
          />
        );
      }} />
        <Route exact path = "/signup" render={props => {
          return(
            <AuthForm removeError={this.props.removeError}
              errors={this.props.errors}
              onAuth={this.props.authUser}
              signUp
              buttonText="Sign Up!"
              heading="Join today!"
              exit={this.state.exit}
              exitReverse={this.state.exitReverse}
              backAction={this.handleClick.bind(this, "/", "back")}
              {...props}
            />
          );
        }} />
        {/* This shouuld become its own fuction: */}
        <Route exact path = "/" render={props =>
          <div className={classNames({
            "home-box": true,
            "exit-animation": this.state.exit,
            "exit-animation-reverse": this.state.exitReverse,
            "enter-animation-reverse": this.state.enterReverse,
            "enter-animation": !this.state.exit,
          })}>
          <div className="welcome-title"><h2>Welcome to Kinkon</h2></div>
          <div className="signup-btn-div"> <Button onClick={this.handleClick.bind(this, "/signup", "next")} type="signup" text="Sign Up" /></div>
          <div className="signin-btn-div"> <Button onClick={this.handleClick.bind(this, "/signin", "next")} type="signin" value="value" text="Sign in"/></div>
        </div>}
        />
      </Switch>
      </div>
    )
    }
}
function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
    errors: state.errors
  };
}
export default connect(mapStateToProps, {authUser, removeError})(LandingPage);
