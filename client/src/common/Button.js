import React, {Component} from "react";
import "./Button.css";
import classNames from "classnames";
import PropTypes from "prop-types";

export const Button = (props) => {
  let {type, onClick, text, loading} = props;
  switch(type){
 case "submit":
   return <button id="submit" className={classNames({"submit-button": true, "button-loading":loading})} onClick={onClick} >{props.children}</button>
 case "signin":
  return <button id="signin" className="sign-in-btn" onClick={onClick} >{text}</button>
  case "signup":
   return <button id="signup" className="sign-up-btn" onClick={onClick} >{text}</button>
  case "delete":
    return <button className="delete-btn"> Delete </button>
  default:
 return  <button  className={`submit-button`} style={{background: "gray"}}>loading...</button>
}
}
Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  text: PropTypes.string
}

export class DeleteButton extends Component{
  constructor(props){
    super(props)
    this.state = {
      verify: false,
      loading: false,
      text: "Delete"
    }
    this.verifyDelete = this.verifyDelete.bind(this);
    this.reset = this.reset.bind(this);
  }
  reset(){
    this.setState({
      verify: false,
      loading: false,
      text: "Delete"
    })
  }
   verifyDelete(){
     if(!this.state.verify){
    this.setState({
      verify: true,
      text: "Are you sure?"
    })}
    else{
      this.setState({
        loading: true,
        verify: false,
        text: "Deleting.."
      })
    this.props.onClick();
    }
  }
  render(){
    const {verify, text} = this.state;

    return(
     <div tabIndex="0" className={classNames({"delete-btn": true, "delete-btn-danger": verify, "delete-btn-loading": this.state.loading})} onClick={this.verifyDelete} onBlur={this.reset}> {text} </div>
    )
  }



}
DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,

}
