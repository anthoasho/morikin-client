import React, {Component} from "react";
import classNames from "classnames";
import "./InputField.css";
import PropTypes from "prop-types";
class Input extends Component{
  constructor(props){
    super(props);
    this.state={
      active: false, //Bottom bar animation - only when active
      placeholderFloat: false, //Animation of the placeholder - Also when field !empty
      error: false,
      name: this.props.name
    }
    this.placeHolderMovement = this.placeHolderMovement.bind(this)
  }
  handleChange = e =>{
      this.props.onChange(this.state.name, e.target.value)
  }
  componentWillMount(){
    this.setState({
      placeholderFloat: this.placeHolderMovement()
    })
  }
  //Checks the status of the input, if there is a value it will move up to clarify input field
  placeHolderMovement = () => {
    if(this.props.value && this.props.value.length > 0){
      return true;
    }else{
      return false;
    }
  }
//On focus the placeholder will move upwards (permanent) and a green active bar will fill underneath (during focus)
  handleFocus = e=>{
    e.preventDefault();
    this.setState({
      active:true,
      placeholderFloat:true,
      error: false
    })
  }

  //If the field is required and unfocused it will give a red highlight and state the field is required
  requirementTest = () =>{
    if(this.props.value < 1 && this.props.isRequired){
      this.setState({
        error:true
      })}else{
        this.setState({
          error:false
        })
      }
  }
  //Leaving the field will remove the green active bar
  handleBlur = e =>{
    e.preventDefault();
    this.setState({
      active:false
    })
    this.requirementTest();
  }

  render(){
    let {type, name, placeholder} = this.props;
    //May alter this to accept other types of input (textarea/dropdown etc)
    const inputField =
    <div className="input-container">
            <p
              className={classNames({
                          "input-placeholder":true,
                          "input-placeholder-active":this.state.placeholderFloat,
                          "input-placeholder-default": !this.state.placeholderFloat,
                          "input-placeholder-error": this.state.error
                        })}>
                {placeholder} {this.state.error && <span> is required </span>}
            </p>
            <input
              className={classNames({"input-box": true, "input-error": this.state.error})}
              style={this.state.error ? {boxShadow: "0 2px 0px 0px #FF0000"} : {boxShadow: "0 1px 0px 0px gray"}}
              type={type}
              name={name}
              placeholder=""
              value={this.props.value}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
            />
            <div className={classNames({"input-hr-holder":true, "input-hr-holder-active":this.state.active})}>
            <hr
              className={classNames({"input-hr":true, "hr-active":this.state.active})}
            />
            </div>
          </div>

    return(
      inputField
    )
  }
}

Input.propTypes = {
    value: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    isRequired: PropTypes.bool
}
export default Input;
