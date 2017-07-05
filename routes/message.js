var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var Message = require('../models/message');


router.get('/', function (req, res, next) {
    Message.find()
        .populate('user', 'firstName')
        .exec(function (err, messages) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occured!',
                    error: err
                });

            }
            res.status(200).json({
                message: 'Successfully retreived message',
                obj: messages
            });
        });
    });

router.use('/', function (req, res, next) {
   jwt.verify(req.query.token, 'secret', function (err, decoded) {
      if (err) {
          return res.status(401).json({
             title: 'Unauthorized User',
              err: err
          });
      }
      next();
   });
});

router.post('/', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err, user) {
       if (err) {
           return res.status(500).json({
               title: 'An error occured!',
               error: err
           });
       }
        var message = new Message({
            content: req.body.content,
            user: user
        });
        message.save(function (err, result) {
            if(err) {
                return res.status(500).json({
                    title: 'An error occured!',
                    error: err
                });
            }
            user.messages.push(result);
            user.save();
            res.status(201).json({
                message: 'Successfully Saved',
                object: result
            });
        });
    });
});

router.patch('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
   Message.findById(req.params.id, function (err, msg) {
      if(err) {
          return res.status(500).json({
              title: 'An error occured!',
              error: err
          });
      }
      if(!msg) {
          return res.status(500).json({
              title: 'No message found!',
              error: {message: 'No message found'}
          });
      }
      if(msg.user != decoded.user._id) {
          return res.status(401).json({
              title: 'User Not Authenticated',
              error: {message: 'User Not Authenticated'}
          });
      }
      msg.content = req.body.content;
      msg.save(function (err, result) {
         if(err) {
             return res.status(500).json({
                 title: 'An error occured!',
                 error: err
             });
         }
          res.status(200).json({
              message: 'Successfully Updated',
              object: result
          });
      });
   });
});

router.delete('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Message.findById(req.params.id, function (err, msg) {
        if(err) {
            return res.status(500).json({
                title: 'An error occured!',
                error: err
            });
        }
        if(!msg) {
            return res.status(500).json({
                title: 'No message found!',
                error: {message: 'No message found'}
            });
        }
        if(msg.user != decoded.user._id) {
            return res.status(401).json({
                title: 'User Not Authenticated',
                error: {message: 'User Not Authenticated'}
            });
        }

        msg.remove(function (err, result) {
            if(err) {
                return res.status(500).json({
                    title: 'An error occured!',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Successfully deleted!',
                object: result
            });
        });
    });
});

module.exports = router;