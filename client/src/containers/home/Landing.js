import React, {Component} from "react";
import {Button} from "../../common/Button";
import AuthForm from "../settings/AuthForm";
import {Switch, Route} from "react-router-dom";
import {connect } from "react-redux";
import {authUser } from "../../store/actions/auth";
import {animateEnter, animateEnterReverse, animateExit, animateExitReverse} from "../../store/actions/animate";
import {removeError} from "../../store/actions/errors";
import {Logo} from "../../common/logo";
import FontAwesome from "react-fontawesome";
import classNames from "classnames";
import "./Landing.css";
import PropTypes from "prop-types";




class LandingPage extends Component {
  constructor(props){
    super(props);
    this.state={
      page: "default"
    }
  }
   handleClick = (e) =>{
      this.setState({
        page: e
      })
      this.props.removeError();
}
  authThenRedirect = (...args) =>{
    this.props.authUser(...args).then(()=>{
      this.props.animateEnter();
    })
  }
  componentWillMount(){
    if(this.props.locationState){
      this.setState({
        page: this.props.locationState
      })
    }
    if(this.props.isLoggedIn){
      this.props.history.push("/")
    }
  }
  render(){
    let {errors} = this.props;


  return(

    <Switch>
      <Route path = "/" render={props =>{
        return(
          <div className="landing-page">
            <div className="landing-logo"  onClick= {() => this.setState({page: "default"})}>
              <Logo />
            </div>
              <div className={classNames({"top-left":true, "extra-height":(this.state.page === "signup" || this.state.page==="signin")})} >
              <div className={classNames({"device": true, "reset-transform-y": (this.state.page === "signup" || this.state.page==="signin")})}>
                {(this.state.page === "signup") &&   <AuthForm
                    errors={errors}
                    onAuth={this.authThenRedirect}
                    signUp
                    buttonText="Sign Up!"
                    heading="Join today!"
                    backAction={this.handleClick.bind(this, "/", "back")}
                    {...props}
                  />}

              {(this.state.page === "signin") && <AuthForm
                errors={errors}
                onAuth={this.authThenRedirect} {...props}
                buttonText="Log in"
                heading="Welcome!"
                backAction={this.handleClick.bind(this, "/", "back")}
              />
            }

            {(this.state.page === "default") &&  <img src={require("../../images/morikin-sh.jpg")} /> }
              </div>
              </div>
              <div className="top-right">
                <h2>Welcome to Morikin </h2>
                <p>Message. Share. Discover.</p>
                <div className="landing-buttons">
                  <button onClick={() => this.handleClick("signup")} className="sign-up-btn">Sign Up</button>
                  <button onClick={() => this.handleClick("signin")} className="sign-in-btn">Sign In</button>
                </div>
              </div>
            <div className={classNames({"bottom-content": true, "transform-y": (this.state.page === "signup" || this.state.page==="signin")})}>
              <div className="bottom-item">
                <div className="icon-holder">
                  <FontAwesome name='comment' className="icon landing-icon"  />
                </div>
                <h4> Post your thoughts out on to the internet </h4>
              </div>
              <div className="bottom-item">
              <div className="icon-holder">
              <FontAwesome name='users' className="icon landing-icon"  />
              </div>
              <h4> Follow your friends </h4>
              </div>
              <div className="bottom-item">
              <div className="icon-holder">
              <FontAwesome name='dice' className="icon landing-icon"  />
              </div>
              <h4> Discover new and interesting people </h4>
              </div>
            </div>
          </div>
        )
    }}
    />
    </Switch>
  )
}
}

LandingPage.propTypes = {
  animate: PropTypes.object,
  errors: PropTypes.object,
  authUser: PropTypes.func
}
function mapStateToProps(state){
  return {
    errors: state.errors,
    animate: state.animate,
    isLoggedIn: state.myProfile.auth.isLoggedIn
  };
}
export default connect(mapStateToProps, {authUser, animateEnter, animateEnterReverse, animateExit, animateExitReverse, removeError})(LandingPage);



/*
<Route exact path = "/signin" render={props => {
  return(
    <AuthForm
      errors={errors}
      onAuth={authThenRedirect} {...props}
      buttonText="Log in"
      heading="Welcome!"
      backAction={handleClick.bind(this, "/", "back")}
    />
  );
}} />
  <Route exact path = "/signup" render={props => {
    return(
      <AuthForm
        errors={errors}
        onAuth={authThenRedirect}
        signUp
        buttonText="Sign Up!"
        heading="Join today!"
        backAction={handleClick.bind(this, "/", "back")}
        {...props}
      />
    );
  }} />*/
