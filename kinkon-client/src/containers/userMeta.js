import React from "react";

export const UserMeta = ({text, data, classDefine}) => {

  return(
          <div className={classDefine}>
            <div className="">
              {text}
            </div>
            <div className="">
              {data}
            </div>
          </div>
    );
};