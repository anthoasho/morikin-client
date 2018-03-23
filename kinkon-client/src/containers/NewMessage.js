import React, { Component } from "react";
import {connect } from "react-redux";
import "./NewMessage.css";
import  {postNewMessage}  from "../store/actions/messages";
class NewMessage extends Component{
    constructor(props){
    super(props);
    this.state = {text: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.characterCount = this.characterCount.bind(this);
    this.letterCheck = this.letterCheck.bind(this);
    this.goBack = this.goBack.bind(this);
    }
  characterCount(text){
    let limit = 160;
    let currentCount = text.split('').length;
    return limit -= currentCount;
  }
  handleChange(e){
    this.setState({
        text: e.target.value
    });
  }
  goBack(){
    this.props.history.goBack(); //At the moment this just sends the user back to the previous page - either don't use router or think of a better solution
  }
  handleSubmit(e){
    e.preventDefault();
    const lengthCheck = this.state.text.length;
    if(lengthCheck < 161 && lengthCheck > 0 ){ //Prevent sending if over character limit of database
      this.props.postNewMessage(this.state.text);
      this.setState({
        text: ""
      });
      this.goBack(); 
      }else if(lengthCheck === 0 ){
        this.setState({
          error:"Please write a message!"
        });
      }
  }
  letterCheck(count){
    if(count < 0){
      return "red";
    }
    else{
      return "green";
    }
  }
    render(){
    const currentCharacterCount = this.characterCount(this.state.text);
    return(
      <div>
        <div className="new-message-box"> 
          {this.props.errors.message && (<div>{this.props.errors.message}</div>)}
          <form
           onSubmit={this.handleSubmit}
          >
          <label>Make a new Post</label>
            <textarea
              name="text"
              rows="3"
              column="10"
              value={this.state.text}
              onChange={this.handleChange}
              />
              <div>
                <p style={{color: this.letterCheck(currentCharacterCount)}}> {currentCharacterCount}</p>
                <button>
                POST
                </button>
              </div>
              
          </form>
        </div>
        <div onClick={this.goBack} className="fullscreen"> {/*Temporary darkend clickable background to escape the new post box --- add escape button listener---*/}
        </div>
      </div>
      );
  }
}
function mapStateToProps(state){
  return {
    errors: state.errors
  };
}
export default connect(mapStateToProps, {postNewMessage})(NewMessage);