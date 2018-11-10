var express = require('express');
var router = express.Router();
const Database = require('../database');
const con = require('../connection');
const db = new Database(con);

function returnUser(req, res, err) { // Returns username and info does this account have admin access. IF password found

    if(req.body.username != null && req.body.password != null) {
        db.query("SELECT username,admin FROM user WHERE username='"+req.body.username+"';")
            .then(rows =>{
                if(rows == "") {
                    db.query("INSERT INTO user (username,password) values ('" + req.body.username + "','" + req.body.password + "');")
                        .then(res.send({message:true}));
                }else{res.send({message:false})}
            }).catch(err =>{ if(err)
            {
                res.send({message:false})
            }});
    }else{res.send({message:"No username or password found."});}
}

function isAvailable(req, res) { // Returns true IF username available

    if(req.body.username != null && req.body.password != null){
        db.query("SELECT username,admin FROM user WHERE username='"+req.body.username+"';")
            .then(rows =>{
                if(rows == "") {
                    res.send({message:true})
                }else{res.send({message:false})}
            }).catch(err =>{ if(err)
        {
            res.send({message:"Bad request!"})
        }});
    }else{
        res.send({message:"Bad request!"});
    }

}

router.post('/',returnUser);
router.post('/available',isAvailable );

module.exports.ru = returnUser;
module.exports = router;
