var express = require('express');
var router = express.Router();
const db = require('../database');
const con = require('../connection');


router.post('/', function(req, res,next) { // Destroy session on logout and terminates DB connection.

    if(typeof req.session.isSet !== "undefined" || req.session.isSet === true){
        req.session.destroy(err =>{
            if(err){
                res.status(500).json({message:"Session failed to destroy"});
            }else{
                res.json({success:true,message:"Session destroyed"});
            }
        });
        db.close().catch((err)=>{
            if(err){
                console.log(err);
            }
        });
    }else{
        res.status(400);
        res.json({success:false,message:"Bad request"});
    }

});

module.exports = router;
