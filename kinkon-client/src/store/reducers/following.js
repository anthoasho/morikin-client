import {LOAD_USER_FOLLOW, UPDATE_FOLLOW_LIST} from "../actionTypes";

const follow = (state = [], action) => {
  switch(action.type){
    case LOAD_USER_FOLLOW:
      return action.users
      case UPDATE_FOLLOW_LIST:
        state = changeState(action.id, action.update, state);
        return [...state]
      default:
        return state;
  }
};

//I wasn't exactly sure how to alter the followlist and keep the previous state largely intact
//This therefore takes a loop and goes through the object until it finds the correct value
// id = part of the object we are targeting
//data = the new data returned from api apiCall
//state = current state
function changeState(id, data, state){
  let test = state;
    for (var i in test){
      //This was a bit of a headache
      let idToString = id.toString();
      if(i === idToString){
        test[i].following = data;
        break;
      }
    }
    return test
}

export default follow;
