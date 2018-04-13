var db = require("../models"),
    jwt = require("jsonwebtoken");

    
exports.followUser = function(req, res, next){
  var currentUser = jwt.decode(req.headers.authorization.split(" ")[1]);
  db.User.findOne({username: req.params.username})
  .then(function(user){
    var index = user.followers.indexOf(currentUser.userId);
    if(index === -1){
      user.followers.push(currentUser.userId);
      user.save().then(function(user){
        db.User.findById(currentUser.userId)
        .then(function(current){
          current.following.push(user._id);
          current.save().then(() =>{
               res.json({following: true, followerCount: user.followers.length, username:user.username});
          });
        });
      });
    }else{
      user.followers.splice(index, 1);
      user.save().then(function(user){
      db.User.findById(currentUser.userId)
        .then(function(current){
          var indexSecond = current.followers.indexOf(user._id);
          current.following.splice(indexSecond, 1);
          current.save().then(() =>{
            console.log(user);
               res.json({following: false, followerCount: user.followers.length, username:user.username});
          });
        });
      });
    }
  });
};


exports.getGetAllMessages = function(req, res, next){
  db.Message.find().sort({createdAt: "desc"})
    .populate("userId", {username: true, profileImgUrl: true, profileColor: true, displayName: true})
    .then(function(messages){
      res.json(messages.filter(message => message.isDeleted === false));
    })
    .catch(function(err){
      res.status(500).json(err);
    });
};
module.exports = exports;
