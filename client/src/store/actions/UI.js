import {SHOW_FOLLOW, CLOSE_FOLLOW, SHOW_LIKES, CLOSE_LIKES, SHOW_NEW_MESSAGE, CLEAR_ALL, ANIMATE_CLOSE, IS_LOADING, IS_LOADED, WINDOW_RESIZE, SET_CONTEXT} from "../actionTypes";
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
export const isLoading = () => ({
  type: IS_LOADING
})
export const isLoaded = () => ({
  type: IS_LOADED
})
export const windowResize = (size) => ({
  type: WINDOW_RESIZE,
  size
})
export const contextSet = context => ({
  type: SET_CONTEXT,
  context
})


export const resizeFunction = (obj) => {
  return dispatch => {
    dispatch(windowResize(obj <= 500))
  }
}
export const showMessageBox = (obj) => {
  return dispatch => {
    dispatch(showNewMessage())
  }
}
export const showLikesList = (obj, hide ) => {
  return (dispatch, getState) => {
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

export const setContext = (context) => {
  return dispatch => {
    dispatch(contextSet(context))
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
