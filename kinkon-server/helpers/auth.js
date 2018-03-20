var db = require("../models"),
    jwt = require("jsonwebtoken");
exports.signin = function(req, res){
  db.User.findOne({username: req.body.username}).then(function(user){
    user.comparePassword(req.body.password, function(err, isMatch){
      if(isMatch){
        var token = jwt.sign({userId: user.id, username: user.username, email:user.email, profileImgUrl: user.profileImgUrl}, process.env.SECRET_KEY);
        res.status(200).json({userId: user.id,
                              username: user.username,
                              profileImgUrl: user.profileImgUrl,
                              token
                            });
      }else {
        res.status(400).json({message: "Invalid email/Password"});
      }
    });
  }).catch(function(err){
    res.status(400).json({message: "Invalid email/Password"});
  });
};

exports.signup = function(req, res, next){
  db.User.create(req.body).then(function(user){
    var token = jwt.sign({userId: user.id, username: user.username, email:user.email, profileImgUrl: user.profileImgUrl}, process.env.SECRET_KEY);
    res.status(200).json({userId: user.id,
                              username: user.username,
                              profileImgUrl: user.profileImgUrl,
                              token
                            });
  }).catch(function(err){
    res.status(400).json(err);
  });
};


module.exports = exports;