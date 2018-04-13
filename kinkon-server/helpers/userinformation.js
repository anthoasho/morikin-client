var db = require("../models"),
    jwt = require("jsonwebtoken");
exports.getUserMessages = function(req, res){
  db.User.findOne({username: req.params.id}).then(function(user){
    db.Message.find({userId: user._id}).sort({createdAt: "desc"})
    .populate("userId", {username: true, profileImgUrl: true, profileColor: true, displayName: true})
    .then(function(messages){
      res.json(messages.filter(message => message.isDeleted === false));
    })
    .catch(function(err){
     if(err.reason === undefined){
      res.status(404).json({message: "Sorry this user does not exist!"});
    }
    });
  });
};

exports.getUserFollow = function(req, res, next){
  var currentUser = jwt.decode(req.headers.authorization.split(" ")[1]);
  if(req.params.follow === "followers" || req.params.follow === "following" ){
  db.User.findOne({username: req.params.user})
  .populate(req.params.follow, {username: true, profileImgUrl: true, followers: true, profileColor: true})
  .then(function(users){
    let data = users[req.params.follow]
    let newdata = data.map(function(obj){
        mappedFollowing = obj.followers.some(e => e.toString() === currentUser.userId);
        let finalData = {
          username: obj.username,
          profileImgUrl: obj.profileImgUrl,
          following: mappedFollowing,
          profileColor: obj.profileColor,
          displayName: obj.displayName
        }
        console.log(finalData)
      return finalData;
    });
  res.json(newdata);
})
}else{
  res.status(404).json({message: "Sorry can't be found"})
}
};

exports.updateProfile = function(req, res, next){
    var currentUser = jwt.decode(req.headers.authorization.split(" ")[1]);
    var data = req.body.userData
    var {username, email, profileImgUrl, color} = data;
    db.User.findById(currentUser.userId).then(function(user){
      for(var i in data){
        if(data[i].length > 1){
          user[i] = data[i]
        }
      }
      user.save().then(function(response){
            var token = jwt.sign({
              userId: response.id,
              username: response.username,
              email:response.email,
              profileImgUrl: response.profileImgUrl,
              profileColor: response.profileColor,
              displayName: response.displayName
            }, process.env.SECRET_KEY);
            res.status(200)
              .json({response,
                token
              });
        });
      })
    };
    exports.getUserProfile = function(req, res){
      db.User.findOne({username: req.params.id})
      .populate("messages", {isDeleted: true})
      .then(function(user){
        var currentUser = jwt.decode(req.headers.authorization.split(" ")[1]);
        const {followers, following, messages, id, username, profileImgUrl, profileColor, displayName} = user;
        let followingTruthy = followers.some(e => e.toString() === currentUser.userId);
        let followingCount = following.length;
        let followerCount = followers.length;
        let messageCount = messages.filter(message => message.isDeleted === false).length;
        res.json({userId: id,
                  username,
                  following: followingTruthy,
                  profileImgUrl,
                  followingCount,
                  followerCount,
                  messageCount,
                  displayName,
                  profileColor
                });
      })
      .catch(function(err){
        if(err.reason === undefined){
          res.status(404).json({message: "Sorry this user does not exist!"});
        }
      });
    };
    module.exports = exports;
