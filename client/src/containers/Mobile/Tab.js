import React from "react";
import classNames from "classnames";
import FontAwesome from "react-fontawesome";
export const Tab = (props) => {

  return(
      <div className={classNames({"tab": true, "hidden": props.id!==props.page})}  >
        {props.children}
      </div>

  )
}

export const TabNav = props =>{
  const pageSelector = (page) =>{
    props.history.push(`/${page}`)
  }
if(props.isMobile){
  return(
    <div className="tab-nav">
      <div className={classNames({"tab-item": true, "icon-current": (props.context === "dashboard" || props.context ===  "profile")})} onClick = {()=> pageSelector("")}>
          <FontAwesome name='home' className="icon"  />
      </div>
      <div className={classNames({"tab-item": true, "icon-current": props.history.location.pathname === "/new"})} onClick = {()=> pageSelector("new")}>
          <FontAwesome name='pencil-alt' className="icon"  />
      </div>
      <div className={classNames({"tab-item": true, "icon-current": props.history.location.pathname === "/discover" })} onClick = {()=> pageSelector("discover")}>
          <FontAwesome name='dice' className="icon"  />
      </div>
      <div className={classNames({"tab-item": true, "icon-current": props.context === `myProfile`})} onClick = {()=> pageSelector("myprofile")}>
          <FontAwesome name='user' className="icon"  />
      </div>

    </div>
  )
}else{
  return null
}

}
export default TabNav;
