var express = require('express');
var router = express.Router();
const Database = require('../database');
const con = require('../connection');
const mysql = require('mysql');
const db = new Database(con);


router.post('/', function(req, res, next) { // Returns username and info does this account have admin access. IF password found

    if(req.body.username != null && req.body.password != null){
        db.query("SELECT username,admin FROM user WHERE password='"+req.body.password+"' AND username='"+req.body.username+"';")
            .then(rows =>{res.send(rows);});
    }else{
        res.send(404,{message:"Bad request!"});
    }

});

module.exports = router;
