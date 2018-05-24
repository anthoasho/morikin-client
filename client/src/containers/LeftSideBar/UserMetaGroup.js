import React from "react";
import UserMeta from "./UserMetaItem";
export const UserMetaGroup = ({profile}) => {
  let {messageCount, followerCount, followingCount, username} = profile;
  //Small area for displaying some meta deta at the bottom of a users profile
  //This may get combined into another file for small things such as this.
  return(
  <div className="user-meta">
    <UserMeta
      text="Posts"
      type="posts"
      data={messageCount}
      username={username}
      classDefine="user-meta-item"
    />
    <UserMeta
      type="followers"
      text="Followers"
      data={followerCount}
      classDefine="user-meta-item meta-mid"
      username={username}
    />
    <UserMeta
      type="following"
      text="Following"
      data={followingCount}
      classDefine="user-meta-item"
      username={username}
    />
  </div>)
}
