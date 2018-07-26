import {ADD_ERROR, REMOVE_ERROR, POPUP_SHOW, POPUP_HIDE, ADD_POPUP_BUTTON } from "../actionTypes";

export const addError = (data, method) => ({
  type: ADD_ERROR,
  data,
  method
});
export const popupButton = (text, func, args) =>({
  type: ADD_POPUP_BUTTON,
  func,
  args,
  text
})
export const removeError = () => ({
  type: REMOVE_ERROR,
});

export const popupShow = () => ({
type: POPUP_SHOW

})
export const popupHide = () => ({
type: POPUP_HIDE
})


export const popupHandler = (method, data, func) => {
  return dispatch => {
    dispatch(popupShow());
    dispatch(popupButton(func));
    switch(method){
      case "error":
        dispatch(addError(data, method));
        break
      default:
        dispatch(popupHide())
    }

  }
}
