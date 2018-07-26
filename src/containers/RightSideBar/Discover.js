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
