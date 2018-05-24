import {SHOW_FOLLOW, CLOSE_FOLLOW, SHOW_LIKES, CLOSE_LIKES, SHOW_NEW_MESSAGE, CLEAR_ALL, ANIMATE_CLOSE} from "../actionTypes";
import {getFollowList, clearFollowList} from "./userProfile";
import {getLikeList} from "./messages";

export const showFollow = (obj) => ({
  type: SHOW_FOLLOW,
  title: obj.title || null,
  url: obj.url|| null,
  method: obj.method
})
export const hideFollow = () =>({
  type:CLOSE_FOLLOW
})

export const showNewMessage = (obj) => ({
  type:SHOW_NEW_MESSAGE

})
export const likesList = (obj) => ({
  type: SHOW_LIKES,
  title: obj.title || null,
  url: obj.url|| null,
  method: obj.method
})
export const hideLikes = () => ({
  type: CLOSE_LIKES
})

export const animateHide = (select) => ({
  type: ANIMATE_CLOSE,
  select
})
export const clearAll = () => ({
  type: CLEAR_ALL
})
export const showMessageBox = (obj) => {
  return dispatch => {
    dispatch(showNewMessage())
  }
}
export const showLikesList = (obj, hide) => {
  return dispatch => {
    if(hide) {
      dispatch(animateHide(hide))
      setTimeout( () => {
        dispatch(hideLikes());
      }, 400)
    }else{
      dispatch(getLikeList(obj.url)).then(()=> {
        dispatch(likesList(obj))
      })
    }
  }
}

export const popUpDisplay = (obj, hide) =>{
  return dispatch => {

    if(hide){
      dispatch(hideFollow());
    }else{
      dispatch(getFollowList(obj.url)).then(()=> {
        dispatch(showFollow(obj))
      })

    }
  }
}
export const clearAllPopUps = () => {
  return dispatch => {
    dispatch(clearAll())
  }
}
export const popUpHide = (select) => {
  return dispatch => {
    dispatch(animateHide(select))
    setTimeout( () => {

      dispatch(hideFollow())
      dispatch(clearFollowList())
    }, 400)

  }
}
