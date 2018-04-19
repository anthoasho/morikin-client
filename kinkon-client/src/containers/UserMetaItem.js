import React from "react";
import {Link} from "react-router-dom";
//Each individual item seen in the Meta group
export const UserMeta = ({text, data, classDefine, username, type}) => {
  return(
        <div className={classDefine}>
          <Link to={`/${username}/${type}`}>
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
