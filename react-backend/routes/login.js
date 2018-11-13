var express = require('express');
var router = express.Router();
const Database = require('../database');
const con = require('../connection');
const db = new Database(con);


router.post('/', function(req, res, next) { // Returns username and info does this account have admin access. IF password found
    if(typeof req.session.login === "undefined" || req.session.login === false){
        req.session.isSet = true;
        req.session.login = false;

        if(req.body.username != null && req.body.password != null){
            db.query("SELECT username,admin FROM user WHERE password='"+req.body.password+"' AND username='"+req.body.username+"';")
                .then(rows =>{
                    if(rows.length > 0 && rows.length < 2){
                        req.session.login = true;
                        req.session.username = rows[0].username;
                        req.session.isAdmin = rows[0].admin; // sets admin status if user has one.
                        res.send(rows);
                    } else{
                        res.header(503);
                        res.send({success:false,message:"Login error"})
                    }
                })
                .catch(err =>{
                    console.log(err);
                    if(err) {
                        res.header(503);
                        res.send({success:false,message:"Server error"})
                    }
                });
        }else{
            res.header(400);
            res.send({success:false,message:"Bad request"});
        }
    } else {res.header(400).send({success:false,message:"All ready logged in!"});}
});

module.exports = router;