var express = require('express');
var router = express.Router();
const db = require('../database');
const con = require('../connection');


router.post('/', function(req, res, next) { // Returns username and info does this account have admin access. IF password found
    if(typeof req.session.login === "undefined" || req.session.login === false){
        req.session.isSet = true;
        req.session.login = false;

        if(req.body.username != null && req.body.password != null){
            db.query("SELECT id,username,admin FROM user WHERE password='"+req.body.password+"' AND username='"+req.body.username+"';")
                .then(rows =>{
                    if(rows.length > 0 && rows.length < 2){
                        req.session.login = true;
                        req.session.username = rows[0].username;
                        req.session.isAdmin = rows[0].admin; // sets admin status if user has one.
                        req.session.userId = rows[0].id;
                        res.json(rows);
                    } else{
                        res.status(503);
                        res.json({success:false,message:"Login error"})
                    }
                })
                .catch(err =>{
                    console.log(err);
                    if(err) {
                        res.status(503);
                        res.json({success:false,message:"Server error"})
                    }
                });
        }else{
            res.status(400);
            res.json({success:false,message:"Bad request"});
        }
    } else {res.status(200).json({logged:true,id:req.session.userId,username:req.session.username,admin:req.session.isAdmin});}
});

router.post('/logged', function(req, res, next) { // Returns username and info does this account have admin access. IF password found
    if(typeof req.session.login === "undefined" || req.session.login === false){
        req.session.isSet = true;
        req.session.login = false;

    } else {res.status(200).json({logged:true,id:req.session.userId,username:req.session.username,admin:req.session.isAdmin});} // Returns true if user is still logged in
});


module.exports = router;
