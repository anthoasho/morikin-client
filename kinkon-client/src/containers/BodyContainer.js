import React, { Component } from 'react';
import {Route, Switch} from "react-router-dom"; 
import Dashboard from "./Dashboard";

import UserProfile from "./UserProfile";

class BodyContainer extends Component {
  render(){
    const {user, newPost} = this.props;
    return(

      <div id="body-container" className="container">

          <Switch>
                <Route path="/user/:id" render={ props => (<UserProfile  userLoggedIn={user} newPost={newPost} {...props}/>)}/> 
                <Route path="/" render={(props) => (<Dashboard userLoggedIn={user} newPost={newPost} {...props}/>) } />
                {/*<MessageList 
                messages={messages}
 */}

          </Switch>
    
          
      </div>
      );
  }
}

export default BodyContainer;