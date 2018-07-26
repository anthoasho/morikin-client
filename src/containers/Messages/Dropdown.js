import React, {Component} from "react";
import classNames from "classnames"
import {DropdownIcon} from "../../common/logo";
class Dropdown extends Component {
  constructor(props) {
    super(props)
    this.onToggle = this.onToggle.bind(this);
    this.setWrapper = this.setWrapper.bind(this);
    this.setChildNode = this.setChildNode.bind(this);
    this.handleClickOutisde = this.handleClickOutisde.bind(this);
    this.state={
      show:false
    }
  }
  componentDidMount(){
      document.addEventListener("mousedown", this.handleClickOutisde);
  }
  componentWillUnmount(){
      document.removeEventListener("mousedown", this.handleClickOutisde);
  }
  onShow(){
    this.setState({
      show: true
    })
  }
  onHide(){
    this.setState({
      show: false
    })
  }
  onToggle(){
    this.setState({
      show: !this.state.show
    })
  }
  setWrapper(node){
    this.node = node;
  }
  setChildNode(node){
    this.childNode = node;
  }
  //There are two refs here to handle different click events that show and hide the dropdown menu
  //The outer ref handles outisde click events and allows the menu button to work without issue
  //The inner ref is used for showing the drop down menu

  handleClickOutisde(e){
    if(this.node && !this.node.contains(e.target)){
      this.onHide();
    }
  }
  render(){
    return(
      <div ref={this.setWrapper} className="dropdown">
        <div className={classNames({"dropdown-button": true, "dropdown-button-active": this.state.show})} onClick={this.onToggle}> <DropdownIcon/> </div>
         <div ref={this.setChildNode} className={classNames({"dropdown-menu": true, "dropdown-show":this.state.show})}>
          {this.props.children}
         </div>
      </div>
    )
  }
}

export const DropdownItem = props =>{
  return(
    <div className="dropdown-item" onClick={props.onClick}> {props.children} </div>
  )
}

export default Dropdown;
