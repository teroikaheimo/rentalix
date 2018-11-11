var express = require('express');
var router = express.Router();
const Database = require('../database');
const con = require('../connection');
const db = new Database(con);


router.post('/', function(req, res, next) { // Returns username and info does this account have admin access. IF password found

    if(req.body.username != null && req.body.password != null){
        db.query("SELECT username,admin FROM user WHERE password='"+req.body.password+"' AND username='"+req.body.username+"';")
            .then(rows =>{res.send(rows);})
            .catch(err =>{ if(err) {res.send({message:false})} });
    }else{
        res.send({message:false});
    }

});

module.exports = router;
