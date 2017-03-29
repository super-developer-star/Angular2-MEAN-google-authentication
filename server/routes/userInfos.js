var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://<user>:<password>@ds143340.mlab.com:43340/********');

router.post('/userInfo', function(req, res, next) {
    var userInfo = req.body;
    if (!userInfo.fullname || !(userInfo.email + '')) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.UserInfo.save(userInfo, function(err, userInfo) {
            if (err) {
                res.send(err);
            }
            res.json(userInfo);
        });
    }
});

module.exports = router;