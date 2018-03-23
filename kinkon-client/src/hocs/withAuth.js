import React, {Component} from "react"; 
import {connect} from "react-redux";

export default function withAuth(ComponentAuth){
  
  class Authenticate extends Component {
    componentWillMount(){
      if(!this.props.isAuthenticated){
        this.props.history.push("/signin");
        console.log(this.props);
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
