import React, {Component} from "react";
import {connect} from "react-redux";
import {getDiscoverUsers} from "../store/actions/userProfile";


//hoc to clarify if the user is logged in, redirects if otherwise
//Unfortunately I have a tendency to not use this
//TODO use this.

export default function withAuth(ComponentAuth){

  class Authenticate extends Component {
    componentWillMount(){
      if(!this.props.isAuthenticated){
        this.props.history.push("/signin");
      }
    }
    componentWillUpdate(){
      if(!this.props.isAuthenticated){
        this.props.history.push("/signin");
      }
    }
    render(){
      return <ComponentAuth {...this.props} />
    }
  }


function mapStateToProps(state){
  return{
    isAuthenticated: state.currentUser.isLoggedIn
  }
}



  return connect(mapStateToProps)(Authenticate);
}

export function apiHOC(ComponentRender){
  class ApiCaller extends Component{
    componentDidMount(){
      this.props.getDiscoverUsers();
    }
  render(){
    return <ComponentRender {...this.props} />
  }
  }


  return connect(null, {getDiscoverUsers})(ApiCaller);
}
