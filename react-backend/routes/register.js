var express = require('express');
var router = express.Router();
const db = require('../database');
const con = require('../connection');

function returnUser(req, res, err) { // INSERTs new user to database.

    if (req.body.username != null && req.body.password != null) {
        db.query(`SELECT username,admin FROM user WHERE username='${req.body.username}';`)
            .then(rows => {
                if (rows == "") {
                    db.query(`INSERT INTO user (username,password) VALUES ('${req.body.username}','${req.body.password}');`)
                        .then(res.json({success: true}));
                } else {
                    res.status(503).json({success: false, message: "Server error #1"})
                }
            }).catch(err => {
            if (err) {
                res.status(503).json({success: false, message: "Server error #2"})
            }
        });
    } else {
        res.status(400).json({success: false, message: "Bad request"});
    }
}

function isAvailable(req, res) { // Returns true IF username available
    if (req.body.username != null) {
        db.query(`SELECT username,admin FROM user WHERE username='${req.body.username}'; `)
            .then(rows => {
                if (rows.length > 0) {
                    res.status(403).json({success: false, message: "Username not available."})
                } else {
                    res.json({success: true, message: "Username available!"})
                }
            }).catch(err => {
            if (err) {
                console.log(err);
                res.status(503).json({success: false, message: "Bad request!"})
            }
        });
    } else {
        res.status(400).json({success: false, message: "Bad request!"});
    }

}

router.post('/', returnUser);
router.post('/available', isAvailable);

module.exports = router;
