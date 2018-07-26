
//I wasn't exactly sure how to alter the followlist and keep the previous state largely intact
//This therefore takes a loop and goes through the object until it finds the correct value
// id = part of the object we are targeting
//data = the new data returned from api apiCall
//state = current state
export function changeStateArrayItem(id, data, state){
  let test = state;
    for (var i in test){
      let idToString = id.toString();
      if(i === idToString){
        test[i].following = data;
        break;
      }
    }
    return test
}

//alter the state to affect the like button aswell as like counter
export function stateWithLikeMessage(data, state){
  var value = state.findIndex(m => m._id === data._id);
  let test = state;
    for (var i in test){
      let valueToString = value.toString();
      if(i === valueToString){
        test[i].isLiked = data.isLiked;
        test[i].likedBy = data.likedBy;
        break;
      }
    }
    return test
}


export function animatedRemoveMessage(data, state){
  var value = state.findIndex(m => m._id === data.id);
  let test = state;
    for (var i in test){
      let valueToString = value.toString();
      if(i === valueToString){
        test[i].isDeleted = true;
        break;
      }
    }
    return test
}
