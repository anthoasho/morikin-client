import React from "react";
import {UserMeta} from "../components/UserMetaItem";
export const UserMetaGroup = ({profile}) => {
  let {messageCount, followerCount, followingCount, username} = profile;
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
