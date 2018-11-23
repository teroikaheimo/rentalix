var express = require('express');
var router = express.Router();
const Database = require('../database');
const mysql = require('mysql');
const con = require('../connection');
const db = new Database(con);


router.post('/modify', function(req, res, next) { //
    if (req.session.login === true) {
        if(typeof req.session.login !== "undefined" && req.body.username != null && req.body.password != null && req.body.newPassword != null && req.body.username === req.session.username){
            db.query("SELECT username,admin FROM user WHERE password='"+req.body.password+"' AND username='"+req.body.username+"';")
                .then((rows) =>{
                    if(rows.length > 0 && rows.length < 2){
                        db.query(`UPDATE user SET password='${req.body.newPassword}' WHERE username='${req.body.username}' AND password='${req.body.password}';`)
                            .then(() =>{
                                res.json({success:true,message:"User password changed"});
                            })
                            .catch(err =>{
                                console.log(err);
                                if(err) {
                                    res.status(503);
                                    res.json({success:false,message:"Server error #1"})
                                }
                            });

                    } else{
                        res.status(503);
                        res.json({success:false,message:"Wrong password!"})
                    }
                })
                .catch(err =>{
                    console.log(err);
                    if(err) {
                        res.status(503);
                        res.json({success:false,message:"Server error #2"})
                    }
                });
        }else{
            res.status(400);
            res.json({success:false,message:"Bad request"});
        }
    }else{res.status(400).json({success:false,message:"Not logged in"})}

});


module.exports = router;
