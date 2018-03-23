require("dotenv").config();
var express   =   require("express"),
    app       =   express(),
    cors      =   require("cors"),
    bodyParser  = require("body-parser"),
    authRoutes  = require("./routes/auth"),
    db      = require("./models"),
    auth = require("./middleware/auth"),
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
  db.Message.find({userId: req.params.id}).sort({createdAt: "desc"})
    .populate("userId", {username: true, profileImgUrl: true})
    .then(function(messages){
      res.json(messages.filter(message => message.isDeleted === false));
    })
    .catch(function(err){
      res.status(500).json(err);
    });
});

app.get("/api/user/:id", function(req, res){
  db.User.findById(req.params.id)
  .then(function(user){
    res.json(user);
  })
  .catch(function(err){
    res.status(500).json(err);
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