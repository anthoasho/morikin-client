import React, {Component} from "react";
import "./UserSmall.css";
/*Temporary styling for colors for each user*/
function randomColor(){
  let red = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);
  return `rgb(${red}, ${blue}, ${green})`;
  
}
  
class UserSmall extends Component{

  render(){
    const  {user} = this.props; 
    const boxColor = randomColor();
    return(
      <div className = "user-profile-small" >
        <div className="img-wrapper">
        <img alt={`${user.username}'s profile `} src={user.profileImgUrl} style={{border: `2px solid ${boxColor}`}} />
        </div>
        <h3 style={{borderBottom: `4px solid ${boxColor}`}}>{user.username}</h3>
        
      </div>
      );
  }
}

export default UserSmall;