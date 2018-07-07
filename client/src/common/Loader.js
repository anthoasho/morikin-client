import React from "react";
import {Logo} from  "./logo.js";
import "./Loader.css";
const LoaderIcon = props => {
  return(
    <div className="loader">
    <div className="loader-after" ><Logo /></div>
      <div className="loader-before"></div>
    </div>
  )
}
export const MiniLoader = props => {
  return(
      <div className="loader-mini"> </div>
  )
}
export default LoaderIcon
