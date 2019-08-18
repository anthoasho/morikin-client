import React, {Component} from "react";
import AuthForm from "../settings/AuthForm";
import {connect } from "react-redux";
import {authUser } from "../../store/actions/auth";
import {removeError} from "../../store/actions/errors";
import "./Landing.css";
import PropTypes from "prop-types";
import styled from "styled-components";


let LoginDiv = styled.div`
min-width: ${props => props.isMobile? "90%": "40%"};
min-height: 40%;
background: white;
box-shadow: 3px 2px 5px #00000080;
padding: ${props => props.isMobile? "3em 0.8em 1em": "1.2em"} ;
box-sizing: content-box;

`
let ContainerDiv = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
`




class LandingPage extends Component {
  constructor(props){
    super(props);
    this.state={
      page: "signin"
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
    let {errors, isMobile} = this.props;

  return(
          <ContainerDiv  >
            <LoginDiv isMobile={isMobile}>
              {(this.props.locationState === "signup") &&   <AuthForm
                  errors={errors}
                  onAuth={this.authThenRedirect}
                  signUp
                  buttonText="Sign Up!"
                  heading="Join today!"
                  {...this.props}
                />}
                  {(this.props.locationState === "signin") && <AuthForm
                    errors={errors}
                    onAuth={this.authThenRedirect} {...this.props}
                    buttonText="Log in"
                    heading="Welcome!"
                  />
                }
            </LoginDiv>
          </ContainerDiv>
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


    // <Switch>
    //   <Route path = "/" render={props =>{
    //     return(
    //       <div className={classNames({"landing-page": true,"login-form-show":(this.state.page === "signup" || this.state.page==="signin")})}>
    //         <div className="landing-logo"  onClick= {() => this.setState({page: "default"})}>
    //           <Logo color="#3e3e3e"/>
    //         </div>
    //           <div className="top-left" >
    //           <div className="device white-box-style">
    //             {(this.state.page === "signup") &&   <AuthForm
    //                 errors={errors}
    //                 onAuth={this.authThenRedirect}
    //                 signUp
    //                 buttonText="Sign Up!"
    //                 heading="Join today!"
    //                 backAction={this.handleClick.bind(this, "/", "back")}
    //                 {...props}
    //               />}
    //
    //           {(this.state.page === "signin") && <AuthForm
    //             errors={errors}
    //             onAuth={this.authThenRedirect} {...props}
    //             buttonText="Log in"
    //             heading="Welcome!"
    //             backAction={this.handleClick.bind(this, "/", "back")}
    //           />
    //         }
    //
    //         {(this.state.page === "default") &&  <img alt="" src={require("../../images/morikin-sh.jpg")} /> }
    //           </div>
    //           </div>
    //           <div className="top-right">
    //             <h2>Welcome to Morikin </h2>
    //             <p>Message. Share. Discover.</p>
    //             <div className="landing-buttons">
    //               <button onClick={() => this.handleClick("signin")} className={classNames({"sign-in-btn":true, "auth-btn-active": (this.state.page === "signin")})}>Sign In</button>
    //               <button onClick={() => this.handleClick("signup")} className={classNames({"sign-up-btn":true, "auth-btn-active": (this.state.page === "signup")})}>Sign Up</button>
    //             </div>
    //           </div>
    //         <div className="bottom-content">
    //           <div className="bottom-item">
    //             <div className="icon-holder">
    //               <FontAwesome name='comment' className="icon landing-icon"  />
    //             </div>
    //             <h4>Message </h4>
    //           </div>
    //           <div className="bottom-item">
    //           <div className="icon-holder">
    //           <FontAwesome name='users' className="icon landing-icon"  />
    //           </div>
    //           <h4> Share </h4>
    //           </div>
    //           <div className="bottom-item">
    //           <div className="icon-holder">
    //           <FontAwesome name='dice' className="icon landing-icon"  />
    //           </div>
    //           <h4> Discover </h4>
    //           </div>
    //         </div>
    //       </div>
    //     )
    // }}
    // />
    // </Switch>




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
