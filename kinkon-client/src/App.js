/* This really needs to be cleaned up - find a way to split this into other files */
import React, { Component } from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {withRouter} from "react-router";
import Login from "./Login";
import BodyContainer from "./containers/BodyContainer";
import * as apiCalls from "./api/Api";
import * as Help from "./utils/MainAppFunctions";
import Navbar from "./containers/Navbar";
import './App.css';
class App extends Component {
constructor(props){
  super(props);
  this.state = {
    user: {
      _id: "",
      isLoggedIn: false,
      username: "You are not logged in!",
      profileImgUrl: "https://4vector.com/i/free-vector-rubik-s-cube-random-clip-art_106251_Rubiks_Cube_Random_clip_art_medium.png",
      token: localStorage.jwtToken || "",
      isDeleted: false
      },
    // messages:[{
    //   _id: 0,
    //   text: "loading",
    //   userId: "",
    //   username: "loading"
    // }]
  };
  
  //Binding this from the "Help" file to minimize space in App -I am still learning
  this.login = Help.login.bind(this);
  this.logout = Help.logout.bind(this);
  this.newPost = Help.newPost.bind(this);
  this.getAllMessages = Help.getAllMessages.bind(this);
  this.getUserMessages = Help.getUserMessages.bind(this);

}

  componentDidMount(){

  }
  componentWillMount(){
    apiCalls.authCheck()
    .then(user => {
      this.login(user);
    })
    .catch(() => (console.log('You are not logged in')));
  }
  render() {
      const {user, messages}  =this.state;
      const Container = withRouter(BodyContainer);
    return (
        <Router>
          <div>
            <Navbar 
              onLogout={this.logout} 
              user ={user}
            />
              { !user.isLoggedIn ?  
                <Login 
                  onLogin={this.login}
                /> 
                :
                null 
              }
            <Container 
              user= {user}
              messages={messages}

            />

          </div>
        </Router>
    );
  }
}

export default App;


