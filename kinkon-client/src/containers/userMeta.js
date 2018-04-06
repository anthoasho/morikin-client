import React from "react";
import {Link} from "react-router-dom";

export const UserMeta = ({text, data, classDefine, username, type}) => {

  return(
          <div className={classDefine}>
          <Link to={`/user/${username}/${type}`}>
            <div className="">
              {text}
            </div>
            <div className="">
              {data}
            </div>
            </Link>
          </div>
    );
};
