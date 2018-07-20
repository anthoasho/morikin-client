import React, {Component} from "react";
import AuthForm from "../settings/AuthForm";
import {Switch, Route} from "react-router-dom";
import {connect } from "react-redux";
import {authUser } from "../../store/actions/auth";
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
    setTimeout(() => window.scrollTo(0,0), 100 )
  }
  componentDidMount(){
    // if(navigator.userAgent.match(/Android/i)){

    // }
  }
  render(){
    let {errors} = this.props;


  return(

    <Switch>
      <Route path = "/" render={props =>{
        return(
          <div className={classNames({"landing-page": true,"login-form-show":(this.state.page === "signup" || this.state.page==="signin")})}>
            <div className="landing-logo"  onClick= {() => this.setState({page: "default"})}>
              <Logo color="#3e3e3e"/>
            </div>
              <div className="top-left" >
              <div className="device white-box-style">
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

            {(this.state.page === "default") &&  <img alt="" src={require("../../images/morikin-sh.jpg")} /> }
              </div>
              </div>
              <div className="top-right">
                <h2>Welcome to Morikin </h2>
                <p>Message. Share. Discover.</p>
                <div className="landing-buttons">
                  <button onClick={() => this.handleClick("signin")} className={classNames({"sign-in-btn":true, "auth-btn-active": (this.state.page === "signin")})}>Sign In</button>
                  <button onClick={() => this.handleClick("signup")} className={classNames({"sign-up-btn":true, "auth-btn-active": (this.state.page === "signup")})}>Sign Up</button>
                </div>
              </div>
            <div className="bottom-content">
              <div className="bottom-item">
                <div className="icon-holder">
                  <FontAwesome name='comment' className="icon landing-icon"  />
                </div>
                <h4>Message </h4>
              </div>
              <div className="bottom-item">
              <div className="icon-holder">
              <FontAwesome name='users' className="icon landing-icon"  />
              </div>
              <h4> Share </h4>
              </div>
              <div className="bottom-item">
              <div className="icon-holder">
              <FontAwesome name='dice' className="icon landing-icon"  />
              </div>
              <h4> Discover </h4>
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
  errors: PropTypes.object,
  authUser: PropTypes.func
}
function mapStateToProps(state){
  return {
    errors: state.errors,
    isLoggedIn: state.myProfile.auth.isLoggedIn
  };
}
export default connect(mapStateToProps, {authUser,  removeError})(LandingPage);



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
