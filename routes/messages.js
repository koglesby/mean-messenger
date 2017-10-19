var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');

var Message = require('../models/message');

router.get('/', function(req, res, next) {
    Message.find()
      .exec(function(err, messages) {
          if (err) {
              return res.status(500).json({
                  title: 'an error occurred',
                  error: err
              });
          }
          res.status(200).json({
              message: 'Success',
              obj: messages
          });
      })
});

router.use('/', function(req, res, next) {
    jwt.verify(req.query.token, 'secretKey', function(err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'not authenticated',
                error: err
            });
        }
        next();
    })
});

// only get here from /messages url
router.post('/', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'an error occurred',
                error: err
            });
        }
        var message = new Message({
            content: req.body.content,
            user: user._id
        });
        message.save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'an error occurred',
                    error: err
                });
            }
            user.messages.push(result);
            res.status(201).json({
                message: 'Saved the message',
                obj: result
            });
            user.save();
        });
    });


});

router.patch('/:id', function(req, res, next) {
    Message.findById(req.params.id, function(err, message) {
        if (err) {
            return res.status(500).json({
                title: 'an error occurred',
                error: err
            });
        }
        if (!message) {
            return res.status(500).json({
                title: 'No Message found',
                error: {message: 'Message not found'}
            });
        }
        message.content = req.body.content;
        message.save(function(err, result) {
          if (err) {
            return res.status(500).json({
              title: 'an error occurred',
              error: err
            });
          }
          res.status(200).json({
            message: 'Updated the message',
            obj: result
          });
        })
    })
});

router.delete('/:id', function(req, res, next) {
  Message.findById(req.params.id, function(err, message) {
    if (err) {
      return res.status(500).json({
        title: 'an error occurred',
        error: err
      });
    }
    if (!message) {
      return res.status(500).json({
        title: 'No Message found',
        error: {message: 'Message not found'}
      });
    }
    message.remove(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'an error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Deleted message',
        obj: result
      });
    })
  })
});

module.exports = router;
