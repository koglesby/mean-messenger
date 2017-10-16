var express = require('express');
var router = express.Router();

var Message = require('../models/message')

// only get here from /messages url
router.post('/', function (req, res, next) {
    var message = new Message({
        content: req.body.content
    });
    message.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'an error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'Saved the message',
            obj: result
        });
    });
});

module.exports = router;
