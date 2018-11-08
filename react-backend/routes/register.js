var express = require('express');
var router = express.Router();
const Database = require('../database');
const con = require('../connection');
const db = new Database(con);


router.post('/', function(req, res, next) { // Returns username and info does this account have admin access. IF password found

    if(req.body.username != null && req.body.password != null) {
        db.query("SELECT username,admin FROM user WHERE username='"+req.body.username+"';")
            .then(rows =>{
                if(rows == "") {
                    db.query("INSERT INTO user (username,password) values ('" + req.body.username + "','" + req.body.password + "');")
                        .then(res.send({message:true}));
                }else{res.send({message:false})}
            });
    }

});
router.post('/available', function(req, res, next) { // Returns true IF username available

    if(req.body.username != null){
        db.query("SELECT username,admin FROM user WHERE username='"+req.body.username+"';")
            .then(rows =>{
                if(rows == "") {
                    res.send({message:true})
                }else{res.send({message:false})}
            });
    }else{
        res.send({message:"Bad request!"});
    }

});

module.exports = router;
