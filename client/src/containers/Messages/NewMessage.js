import React, { Component } from "react";
import PropTypes from "prop-types";
import {connect } from "react-redux";
import "./NewMessage.css";
import  {postNewMessage}  from "../../store/actions/messages";
import {Button} from "../../common/Button";
import {showNewMessage} from "../../store/actions/UI";
import {withRouter} from "react-router-dom";
import classNames from "classnames";
import SlideBox from "../../common/SlideBox"
class NewMessage extends Component{
    constructor(props){
    super(props);
    this.state = {text: "",
                  loading: false,
                  show: false
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
  //At the moment this just sends the user back to the previous page - either don't use router or think of a better solution
  goBack(){
    // this.props.animateExitReverse();
    this.setState({
      show: false
    })
    setTimeout(() => this.props.showNewMessage(), 1000)
    // this.props.showNewMessage();
    // this.props.history.push("/");
  }
  componentDidMount(){
    this.setState({
      show: true
    })
  }
  componentWillMount(){
    // this.props.animateEnter();
  }

  handleSubmit(e){
    e.preventDefault();
    const lengthCheck = this.state.text.length;
    //Prevent sending if over character limit of database (160 characters - subject to change )
    if(lengthCheck < 161 && lengthCheck > 0 ){
      this.props.postNewMessage(this.state.text);
      this.setState({
        text: "",
        loading:true
      });

      //2 second delay to simulate loading - purely for test purposes
      // setTimeout(this.goBack, 400)
      }else if(lengthCheck === 0 ){
        this.setState({
          error:"Please write a message!"
        });
      }
  }
  //Check the letter count and change the color of the text
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
    const content = (
      <div className="new-inner-contents">
        {this.props.errors.message && (<div>{this.props.errors.message}</div>)}
        <form
         onSubmit={this.handleSubmit}
         className="new-message-form"
        >
          <label>Make a new Post</label>
          <textarea
            name="text"
            className="new-message-textarea"
            value={this.state.text}
            onChange={this.handleChange}
          />
          <p
            style={{color: this.letterCheck(currentCharacterCount)}}
            className="character-counter"
          >
            {currentCharacterCount}
          </p>
          <Button
            type="submit"
            loading={this.state.loading}>
            <span style={{width: "100%"}}>Post</span>
            </Button>
        </form>
      </div>
    )
    return(
      <div className={classNames({"new-message-box": true, "show-message-box": this.state.show})}>
        <SlideBox
          exit={null}
          exitReverse={null}
          backAction={this.goBack}
          content={content} />
      </div>
      );
  }
}
NewMessage.propTypes = {
  errors: PropTypes.object,
  postNewMessage: PropTypes.func,
  showNewMessage: PropTypes.func
}

function mapStateToProps(state){
  return {
    errors: state.errors
  };
}
export default withRouter(connect(mapStateToProps, {postNewMessage, showNewMessage})(NewMessage));
