var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var User = require('../models/user');


router.post('/', function (req, res, next) {
   var user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: bcrypt.hashSync(req.body.password, 10),
      email: req.body.email
   });
   user.save(function (err, result) {
       if(err) {
          return res.status(500).json({
             title: 'An error occured!',
              error: err
          });
       }
       res.status(201).json({
          title: 'User Registered',
           object: result
       });

   });

});

router.post('/signin', function (req, res, next) {
   User.findOne({email: req.body.email}, function (err, user) {
      if (err) {
          return res.status(500).json({
              title: 'An error occured!',
              error: err
          });
      }
      if(!user) {
          return res.status(401).json({
             title: 'Invalid Credentials',
              error: {message: 'Invalid Credentials'}
          });
      }
      if(!bcrypt.compareSync(req.body.password, user.password)){
          return res.status(401).json({
              title: 'Invalid Credentials',
              error: 'Invalid Credentials'
          });
      }
      var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
      res.status(200).json({
         title: 'Successfully LoggedIn',
          token: token,
          userId: user._id
      });
   });
});

module.exports = router;