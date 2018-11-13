var express = require('express');
var router = express.Router();
const Database = require('../database');
const con = require('../connection');
const db = new Database(con);

function returnUser(req, res, err) { // Returns username and info does this account have admin access. IF password found


    if(req.body.username != null && req.body.password != null) {
        db.query("SELECT username,admin FROM user WHERE username='"+req.body.username+"';")
            .then(rows =>{
                if(rows === "") {
                    db.query("INSERT INTO user (username,password) values ('" + req.body.username + "','" + req.body.password + "');")
                        .then( res.send({message:true}));
                }else{res.send({success:false,message:false})}
            }).catch(err =>{ if(err)
            {
                res.header(503).send({success:false,message:"Error"})
            }});
    }else{res.header(400).send({success:false,message:"No username or password found."});}
}

function isAvailable(req, res) { // Returns true IF username available

    if(req.body.username != null && req.body.password != null){
        db.query("SELECT username,admin FROM user WHERE username='"+req.body.username+"';")
            .then(rows =>{
                if(rows === "") {
                    res.send({success:true,message:"Username available."})
                }else{res.send({success:false,message:"Username not available!"})}
            }).catch(err =>{ if(err)
        {
            res.header(503).send({success:false,message:"Bad request!"})
        }});
    }else{
        res.header(400).send({success:false,message:"Bad request!"});
    }

}

router.post('/',returnUser);
router.post('/available',isAvailable );

module.exports = router;
