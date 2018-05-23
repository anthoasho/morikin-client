import React from "react";
import {popUpDisplay, clearAllPopUps} from "../store/actions/UI";
import {connect } from "react-redux";
import {withRouter} from "react-router-dom";
//Each individual item seen in the Meta group
const UserMeta = ({text, data, classDefine, username, type, popUpDisplay, ui, history, clearAllPopUps}) => {
  function handleFollowShow(){
    let obj = {
      method: "list",
      title: `${type[0].toUpperCase()}${type.slice(1)}`, //bit hacky 
      url: `/user/${username}/${type}`
    }
    if(obj.url === ui.url ){
      popUpDisplay(obj, true)
    }
    else if(type === "posts"){
      clearAllPopUps()
      history.push(`/${username}`)
    }
    else{
      popUpDisplay(obj)
    }
  }
  return(
        <div className={classDefine}>
          <a onClick={handleFollowShow}>
            <div className="">
              {text}
            </div>
            <div className="">
              {data}
            </div>
          </a>
        </div>
    );
};
function mapStateToProps(state){
  return {
    ui: state.ui.follow
  };
}
export default withRouter(connect(mapStateToProps, {popUpDisplay, clearAllPopUps})(UserMeta));
