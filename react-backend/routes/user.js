var express = require('express');
var router = express.Router();
const Database = require('../database');
const mysql = require('mysql');
const con = require('../connection');
const db = new Database(con);


router.post('/modify', function(req, res, next) { //
    if(typeof req.session.login !== "undefined" && req.body.username != null && req.body.password != null && req.body.newPassword != null && req.body.username === req.session.username){
        db.query("SELECT username,admin FROM user WHERE password='"+req.body.password+"' AND username='"+req.body.username+"';")
            .then((rows) =>{
                if(rows.length > 0 && rows.length < 2){
                    db.query(`UPDATE user SET password='${req.body.newPassword}' WHERE id='5';`)
                        .then(() =>{
                                res.send({success:true,message:"User password changed"});
                        })
                        .catch(err =>{
                            console.log(err);
                            if(err) {
                                res.header(503);
                                res.send({success:false,message:"Server error #1"})
                            }
                        });

                } else{
                    res.header(503);
                    res.send({success:false,message:"Wrong password!"})
                }
            })
            .catch(err =>{
                console.log(err);
                if(err) {
                    res.header(503);
                    res.send({success:false,message:"Server error #2"})
                }
            });
    }else{
        res.header(400);
        res.send({success:false,message:"Bad request"});
    }
});


module.exports = router;
