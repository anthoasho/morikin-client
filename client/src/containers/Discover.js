import React from "react";
import DiscoverUser from "./DiscoverUser";
import "./Discover.css";

const Discover = (props) => {

  return (
    <div className="discover-box">
      <h3> Discover</h3>
      <div>
        <DiscoverUser {...props} />
      </div>

    </div>
  )
}

export default Discover


/*
  <div className="discover-recent">
  <div className="discover-titles">  Recent Messages </div>
  Recent messages? Maybe this will go
  </div>
  <div className="discover-popular">
  <div className="discover-titles">  Popular Messages </div>
  Messages with most likes recently?
  </div>
  */
