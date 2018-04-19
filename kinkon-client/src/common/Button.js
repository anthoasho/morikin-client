import React, {Component} from "react";
import "./Button.css";
import classNames from "classnames";


export const Button = (props) => {
  let {type, onClick, text, loading} = props;
  switch(type){
 case "submit":
   return <button id="submit" className={classNames({"submit-button": true, "button-loading":loading})} onClick={onClick} >{text}</button>
 case "signin":
  return <button id="signin" className="sign-in-btn" onClick={onClick} >{text}</button>
  case "signup":
   return <button id="signup" className="sign-up-btn" onClick={onClick} >{text}</button>
  case "delete":
    return <button className="delete-btn" onClick={test}> Delete </button>

  default:
 return  <button  className={`submit-button`} style={{background: "gray"}}>loading...</button>
}
}


export class DeleteButton extends Component{
  constructor(props){
    super(props)
    this.state = {
      verify: false,
      loading: false,
      text: "Delete"
    }
    this.test = this.test.bind(this);
  }
   test(){
     if(!this.state.verify){
       setTimeout(() => {
         this.setState({
           text: "Are you sure?"
         })
       }, 300)
    this.setState({
      verify: true,
      text: ""
    })}
    else{
      this.setState({
        loading: true,
        verify: false,
        text: ""
      })
    this.props.onClick();
    }
  }
  render(){
    const {verify, text} = this.state;

    return(
     <div className={classNames({"delete-btn": true, "delete-btn-danger": verify, "delete-btn-loading": this.state.loading})} onClick={this.test}> {text} </div>
    )
  }



}
