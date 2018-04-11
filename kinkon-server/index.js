require("dotenv").config();
var express   =   require("express"),
    app       =   express(),
    cors      =   require("cors"),
    bodyParser  = require("body-parser"),
    authRoutes  = require("./routes/auth"),
    db      = require("./models"),
    auth = require("./middleware/auth"),
    jwt = require("jsonwebtoken"),
    messagesRoutes  = require("./routes/messages");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
process.on('unhandledRejection', function(reason, promise) {
    console.log(promise);
});

app.get("/", function(req, res){
  res.json({message:"Make a post request to sign up!"});
});
app.get("/api/user/:id/messages", function(req, res){
  db.User.findOne({username: req.params.id}).then(function(user){
    db.Message.find({userId: user._id}).sort({createdAt: "desc"})
    .populate("userId", {username: true, profileImgUrl: true, profileColor: true})
    .then(function(messages){
      res.json(messages.filter(message => message.isDeleted === false));
    })
    .catch(function(err){
     if(err.reason === undefined){
      res.status(404).json({message: "Sorry this user does not exist!"});
    }
    });
  });
});



app.post("/api/:username/follow", auth.loginRequired, function(req, res, next){
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
});
app.get("/api/user/:id", function(req, res){
  db.User.findOne({username: req.params.id})
  .populate("messages", {isDeleted: true})
  .then(function(user){
    var currentUser = jwt.decode(req.headers.authorization.split(" ")[1]);
    const {followers, following, messages, id, username, profileImgUrl, profileColor} = user;
    let followingTruthy = followers.some(e => e.toString() === currentUser.userId);
    let followingCount = following.length;
    let followerCount = followers.length;
    let messageCount = messages.filter(message => message.isDeleted === false).length;
    res.json({userId: id,
              username,
              profileImgUrl,
              following: followingTruthy,
              followingCount,
              followerCount,
              messageCount,
              profileColor
            });
  })
  .catch(function(err){
    if(err.reason === undefined){
      res.status(404).json({message: "Sorry this user does not exist!"});
    }
  });
});
app.use("/api/users/:id/messages", auth.loginRequired, auth.ensureCorrectUser, messagesRoutes);
app.use("/api/auth", authRoutes);

/*
  ---------------------- THIS IS INNEFFICIENT BUT WILL DO FOR NOW--------------------------------
*/
app.get("/api/user/:user/:follow", function(req, res, next){
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
          profileColor: obj.profileColor
        }
        console.log(finalData)
      return finalData;
    });
  res.json(newdata);
})
}else{
  res.status(404).json({message: "Sorry can't be found"})
}

})

app.get("/api/messages/", function(req, res, next){
  db.Message.find().sort({createdAt: "desc"})
    .populate("userId", {username: true, profileImgUrl: true, profileColor: true})
    .then(function(messages){
      res.json(messages.filter(message => message.isDeleted === false));
    })
    .catch(function(err){
      res.status(500).json(err);
    });
});
const PORT = 8081;
app.listen(PORT, function(){
  console.log(`Server is listening on port ${PORT}`);
});
