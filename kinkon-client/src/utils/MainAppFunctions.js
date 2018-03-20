import * as apiCalls from "../api/Api";

// Main app functions
//Create a new post
export function newPost(post){
  apiCalls.postNewMessage(post)
  .then(res => {
    if(!res.errorMessage){
    this.setState({
      messages:[res, ...this.state.messages]
    })}
    else{
      console.log("woops");
    }});
  }
  
export function getUserMessages(user){
   apiCalls.getUserMessage(user)
  .then(res => {
    this.setState({
        messages: [...res],
        user: res[0].userId
      }); 
  })
  .catch(err =>{
    console.log(err);
  });
}
  
export function getAllMessages(start, end){ //Gets messages, start and end help control endless scrolling
    apiCalls.getAllMessages(start, end)
    .then(res => {
      this.setState({
        messages: [...this.state.messages, ...res]
      });
    })
    .catch(err =>{
      console.log(err);
    });
  }
  
  export function login(user){
  this.setState({
      user: {
        isLoggedIn: true,
        _id: user.userId,
        username: user.username,
        profileImgUrl: user.profileImgUrl,
        token: user.token,
    }
  });
  return user;
}

export function logout(){
    this.setState({
      user: {
        isLoggedIn: false,
        username: "",
        profileImgUrl: "",
        token: ""
    }
  });
  localStorage.removeItem("jwtToken");
}

export function softDelete(user, message, index){
  apiCalls.deleteMessage(user, message).then((res) => {
    if(res.status && res.status === 200){
     this.setState((prevState) => ({
    messages: prevState.messages.filter((_, i) => i !== index)
  }))}else{
    console.log("You do not have permission!!");
  }
  });
}

export function continueUpdate(){ // adds state to control endless scrolling
   this.setState({
   messageCount:{
    start: this.state.messageCount.start +20,
    end: this.state.messageCount.end +20
   }
  });
  this.getAllMessages(this.state.messageCount.start, this.state.messageCount.end);
}