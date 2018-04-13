import React, {Component} from "react";
import classNames from "classnames";
import "./InputField.css";

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
  componentDidMount(){
    this.setState({
      placeholderFloat: this.placeHolderMovement()
    })
  }
  placeHolderMovement = () => {
    if(this.props.value.length > 0){
      return true;
    }else{
      return false;
    }
  }
  handleFocus = e=>{
    e.preventDefault();
    this.setState({
      active:true,
      placeholderFloat:true,
      error: false
    })
  }
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
  handleBlur = e =>{
    e.preventDefault();
    this.setState({
      active:false,
    })
    this.requirementTest();
  }
  render(){
    let {type, name, placeholder} = this.props;
    return(
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
          type={type}
          name={name}
          placeholder=""
          value={this.props.value}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
        />
        <hr
          className={classNames({"input-hr":true, "hr-active":this.state.active})}
        />
      </div>
    )
  }
}
export default Input;
