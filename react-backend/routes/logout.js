var express = require('express');
var router = express.Router();
const Database = require('../database');
const con = require('../connection');
const db = new Database(con);


router.post('/', function(req, res,next) { // Destroy session on logout and terminates DB connection.

    if(typeof req.session.isSet !== "undefined" || req.session.isSet === true){
        req.session.destroy(err =>{
            if(err){
                res.header(500).send({message:"Session failed to destroy"});
            }else{
                res.send({success:true,message:"Session destroyed"});
            }
        });
        db.close().catch((err)=>{
            if(err){
                console.log(err);
            }
        });
    }else{
        res.header(400);
        res.send({success:false,message:"Bad request"});
    }

});

module.exports = router;
