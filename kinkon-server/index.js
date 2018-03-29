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

app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})


app.get("/", function(req, res){
  res.json({message:"Make a post request to sign up!"});
});
app.get("/api/user/:id/messages", function(req, res){
  db.User.findOne({username: req.params.id}).then(function(user){
    db.Message.find({userId: user._id}).sort({createdAt: "desc"})
    .populate("userId", {username: true, profileImgUrl: true})
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

app.post("/api/:username/follow", function(req, res, next){
  var currentUser = jwt.decode(req.headers.authorization.split(" ")[1]);
  db.User.findOne({username: req.params.username})
  .then(function(user){
    user.followers.push(currentUser.userId);
    user.save().then(function(){
      res.json();
    });
  });
});

app.get("/api/user/:id", function(req, res){
  db.User.findOne({username: req.params.id})
  .then(function(user){
    var currentUser = jwt.decode(req.headers.authorization.split(" ")[1]);
    let following = user.followers.some(e => e.toString() === currentUser.userId);
    res.json({userId: user.id,
              username: user.username,
              profileImgUrl: user.profileImgUrl,
              following: following
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

app.get("/api/messages/", function(req, res, next){
  db.Message.find().sort({createdAt: "desc"})
    .populate("userId", {username: true, profileImgUrl: true})
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