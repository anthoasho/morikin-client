import React, {Component} from "react";
import "./Button.css";
import classNames from "classnames";


export const Button = (props) => {
  let {type, onClick, text, loading, removeMessage} = props;

  function test(){
    console.log(this)
  }
  switch(type){
 case "submit":
   return <button className={classNames({"submit-button": true, "button-loading":loading})} onClick={onClick} >{text}</button>
 case "signin":
  return <button className="sign-in-btn" onClick={onClick} >{text}</button>
  case "signup":
   return <button className="sign-up-btn" onClick={onClick} >{text}</button>
  case "delete":
    return <button className="delete-btn" onClick={test}> Delete </button>

 // case "profileEdit":
 //   return   <Link to={`/editprofile`} style={{width: "80%", margin: "auto"}}><button  className={`follow-button unfollow-button ${props.extraClass && props.extraClass}`} style={{width: "100%"}} onClick={handleProfileOptions} >Edit Profile</button></Link>
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

      // setTimeout(() =>{

        this.props.onClick();
      // }, 300)
    }
  }
  render(){
    const {verify, text} = this.state;

    return(
     <div className={classNames({"delete-btn": true, "delete-btn-danger": this.state.verify, "delete-btn-loading": this.state.loading})} onClick={this.test}> {text} </div>
    )
  }



}
